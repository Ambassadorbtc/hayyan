from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI(title="Hayyan API", description="Backend API for Hayyan energy savings app")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class UserBase(BaseModel):
    email: str
    first_name: str
    last_name: str
    business_name: Optional[str] = None
    business_type: Optional[str] = None
    postcode: Optional[str] = None
    mobile_number: Optional[str] = None
    auth_method: str = "email"


class UserCreate(UserBase):
    pass


class User(UserBase):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        from_attributes = True


class SupplierInfo(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    user_id: str
    current_electric_supplier: Optional[str] = None
    current_gas_supplier: Optional[str] = None
    monthly_electric_bill: float = 0
    monthly_gas_bill: float = 0
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)


class SupplierInfoCreate(BaseModel):
    user_id: str
    current_electric_supplier: Optional[str] = None
    current_gas_supplier: Optional[str] = None
    monthly_electric_bill: float = 0
    monthly_gas_bill: float = 0


class QuoteRequest(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    user_id: str
    supplier_id: str
    supplier_name: str
    current_monthly_bill: float
    estimated_savings_percent: float
    estimated_annual_savings: float
    status: str = "pending"
    created_at: datetime = Field(default_factory=datetime.utcnow)


class QuoteRequestCreate(BaseModel):
    user_id: str
    supplier_id: str
    supplier_name: str
    current_monthly_bill: float
    estimated_savings_percent: float
    estimated_annual_savings: float


class StatusCheck(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)


class StatusCheckCreate(BaseModel):
    client_name: str


# Health check
@api_router.get("/")
async def root():
    return {"message": "Hayyan API is running!", "version": "1.0.0"}


@api_router.get("/health")
async def health_check():
    return {"status": "healthy", "timestamp": datetime.utcnow().isoformat()}


# User endpoints
@api_router.post("/users", response_model=User)
async def create_user(user: UserCreate):
    # Check if user already exists
    existing_user = await db.users.find_one({"email": user.email})
    if existing_user:
        # Return existing user
        return User(**existing_user)
    
    user_dict = user.dict()
    user_obj = User(**user_dict)
    await db.users.insert_one(user_obj.dict())
    return user_obj


@api_router.get("/users/{user_id}", response_model=User)
async def get_user(user_id: str):
    user = await db.users.find_one({"id": user_id})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return User(**user)


@api_router.put("/users/{user_id}", response_model=User)
async def update_user(user_id: str, user_update: UserCreate):
    user = await db.users.find_one({"id": user_id})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    update_data = user_update.dict()
    update_data["updated_at"] = datetime.utcnow()
    
    await db.users.update_one({"id": user_id}, {"$set": update_data})
    
    updated_user = await db.users.find_one({"id": user_id})
    return User(**updated_user)


# Supplier info endpoints
@api_router.post("/supplier-info", response_model=SupplierInfo)
async def create_or_update_supplier_info(info: SupplierInfoCreate):
    existing = await db.supplier_info.find_one({"user_id": info.user_id})
    
    if existing:
        update_data = info.dict()
        update_data["updated_at"] = datetime.utcnow()
        await db.supplier_info.update_one({"user_id": info.user_id}, {"$set": update_data})
        updated = await db.supplier_info.find_one({"user_id": info.user_id})
        return SupplierInfo(**updated)
    else:
        info_obj = SupplierInfo(**info.dict())
        await db.supplier_info.insert_one(info_obj.dict())
        return info_obj


@api_router.get("/supplier-info/{user_id}", response_model=SupplierInfo)
async def get_supplier_info(user_id: str):
    info = await db.supplier_info.find_one({"user_id": user_id})
    if not info:
        raise HTTPException(status_code=404, detail="Supplier info not found")
    return SupplierInfo(**info)


# Quote request endpoints
@api_router.post("/quotes", response_model=QuoteRequest)
async def create_quote_request(quote: QuoteRequestCreate):
    quote_obj = QuoteRequest(**quote.dict())
    await db.quotes.insert_one(quote_obj.dict())
    return quote_obj


@api_router.get("/quotes/{user_id}", response_model=List[QuoteRequest])
async def get_user_quotes(user_id: str):
    quotes = await db.quotes.find({"user_id": user_id}).to_list(100)
    return [QuoteRequest(**quote) for quote in quotes]


# UK Energy Suppliers endpoint
@api_router.get("/suppliers")
async def get_uk_suppliers():
    return {
        "suppliers": [
            {"id": "octopus", "name": "Octopus Energy", "logo": "🐙", "color": "#FF00FF", "rating": 4.8, "avg_savings_percent": 15},
            {"id": "bulb", "name": "Bulb", "logo": "💡", "color": "#00D68F", "rating": 4.5, "avg_savings_percent": 12},
            {"id": "ovo", "name": "OVO Energy", "logo": "🌿", "color": "#00A676", "rating": 4.6, "avg_savings_percent": 18},
            {"id": "edf", "name": "EDF Energy", "logo": "⚡", "color": "#FF6600", "rating": 4.2, "avg_savings_percent": 10},
            {"id": "british_gas", "name": "British Gas", "logo": "🔥", "color": "#003087", "rating": 4.0, "avg_savings_percent": 8},
            {"id": "shell", "name": "Shell Energy", "logo": "🐚", "color": "#FFD700", "rating": 4.3, "avg_savings_percent": 14},
            {"id": "eon", "name": "E.ON Next", "logo": "🌟", "color": "#E30613", "rating": 4.4, "avg_savings_percent": 11},
            {"id": "scottish_power", "name": "Scottish Power", "logo": "🏴‍☠️", "color": "#00529B", "rating": 4.1, "avg_savings_percent": 9},
        ]
    }


# Status check (legacy endpoint)
@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.dict()
    status_obj = StatusCheck(**status_dict)
    _ = await db.status_checks.insert_one(status_obj.dict())
    return status_obj


@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find().to_list(1000)
    return [StatusCheck(**status_check) for status_check in status_checks]


# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
