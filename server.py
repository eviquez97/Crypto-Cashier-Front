#!/usr/bin/env python3
"""
Simple HTTP server for Cashira Frontend
Serves the frontend files and proxies API calls
"""

import os
import sys
import json
import http.server
import socketserver
import urllib.parse
import urllib.request
from typing import Dict, Any

class CashiraFrontendHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        # API base URL - change this to your Railway URL
        self.api_base = os.getenv('API_BASE', 'http://localhost:8000')
        super().__init__(*args, **kwargs)
    
    def do_GET(self):
        """Handle GET requests"""
        if self.path.startswith('/api/'):
            # Proxy API requests
            self.proxy_api_request()
        else:
            # Serve static files
            super().do_GET()
    
    def do_POST(self):
        """Handle POST requests"""
        if self.path.startswith('/api/'):
            # Proxy API requests
            self.proxy_api_request()
        else:
            super().do_POST()
    
    def do_PUT(self):
        """Handle PUT requests"""
        if self.path.startswith('/api/'):
            # Proxy API requests
            self.proxy_api_request()
        else:
            super().do_PUT()
    
    def do_DELETE(self):
        """Handle DELETE requests"""
        if self.path.startswith('/api/'):
            # Proxy API requests
            self.proxy_api_request()
        else:
            super().do_DELETE()
    
    def proxy_api_request(self):
        """Proxy API requests to backend"""
        try:
            # Remove /api prefix and construct backend URL
            backend_path = self.path[4:]  # Remove '/api'
            backend_url = f"{self.api_base}{backend_path}"
            
            # Get request body if present
            content_length = int(self.headers.get('Content-Length', 0))
            post_data = None
            if content_length > 0:
                post_data = self.rfile.read(content_length)
            
            # Create request to backend
            req = urllib.request.Request(
                backend_url,
                data=post_data,
                headers=dict(self.headers)
            )
            req.get_method = lambda: self.command
            
            # Make request to backend
            with urllib.request.urlopen(req) as response:
                # Get response data
                response_data = response.read()
                
                # Send response
                self.send_response(response.status)
                
                # Copy headers
                for header, value in response.headers.items():
                    if header.lower() not in ['connection', 'transfer-encoding']:
                        self.send_header(header, value)
                
                self.end_headers()
                self.wfile.write(response_data)
                
        except urllib.error.HTTPError as e:
            # Handle HTTP errors
            self.send_response(e.code)
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            
            error_response = {
                'detail': f'Backend error: {e.reason}',
                'status_code': e.code
            }
            self.wfile.write(json.dumps(error_response).encode())
            
        except Exception as e:
            # Handle other errors
            self.send_response(500)
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            
            error_response = {
                'detail': f'Proxy error: {str(e)}',
                'status_code': 500
            }
            self.wfile.write(json.dumps(error_response).encode())
    
    def end_headers(self):
        """Add CORS headers"""
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
        super().end_headers()
    
    def do_OPTIONS(self):
        """Handle CORS preflight requests"""
        self.send_response(200)
        self.end_headers()

def main():
    """Main function"""
    port = int(os.getenv('FRONTEND_PORT', 3000))
    
    print(f"🚀 Starting Cashira Frontend Server")
    print(f"📁 Serving files from: {os.getcwd()}")
    print(f"🔗 API Base URL: {os.getenv('API_BASE', 'http://localhost:8000')}")
    print(f"🌐 Frontend URL: http://localhost:{port}")
    print(f"📚 API Documentation: http://localhost:{port}/api/docs")
    print()
    print("Press Ctrl+C to stop the server")
    print("=" * 50)
    
    # Change to frontend directory
    frontend_dir = os.path.dirname(os.path.abspath(__file__))
    os.chdir(frontend_dir)
    
    # Start server
    with socketserver.TCPServer(("", port), CashiraFrontendHandler) as httpd:
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n🛑 Server stopped")
            sys.exit(0)

if __name__ == "__main__":
    main()
