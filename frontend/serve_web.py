#!/usr/bin/env python3
"""Simple static file server for Enerzo web app"""
import http.server
import socketserver
import os

PORT = 3000
DIRECTORY = "/app/frontend/dist"

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)
    
    def end_headers(self):
        # Enable CORS
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', '*')
        super().end_headers()
    
    def do_GET(self):
        # Serve index.html for SPA routing
        path = self.path.split('?')[0]
        file_path = os.path.join(DIRECTORY, path.lstrip('/'))
        
        # If path doesn't exist as file, try adding .html
        if not os.path.exists(file_path) or os.path.isdir(file_path):
            html_path = file_path.rstrip('/') + '.html'
            if os.path.exists(html_path):
                self.path = path + '.html'
            elif os.path.exists(os.path.join(file_path, 'index.html')):
                self.path = path.rstrip('/') + '/index.html'
        
        return super().do_GET()

if __name__ == "__main__":
    os.chdir(DIRECTORY)
    with socketserver.TCPServer(("0.0.0.0", PORT), Handler) as httpd:
        print(f"Serving Enerzo web app at http://0.0.0.0:{PORT}")
        httpd.serve_forever()
