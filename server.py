#!/usr/bin/env python3
import os
import sys
import json
import http.server
import socketserver
import urllib.parse

class CashiraFrontendHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        # Parse the URL
        parsed_path = urllib.parse.urlparse(self.path)
        path = parsed_path.path
        
        # Health check endpoint
        if path == '/health':
            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            health_response = {'status': 'healthy', 'service': 'crypto-cashier-frontend', 'version': '2.0.0'}
            self.wfile.write(json.dumps(health_response).encode())
            return
        
        # Dashboard route - redirect to dashboard.html
        elif path == '/dashboard' or path == '/dashboard/':
            self.send_response(302)
            self.send_header('Location', '/dashboard.html')
            self.end_headers()
            return
        
        # Root path - serve index.html (landing page)
        elif path == '/' or path == '/index.html':
            self.serve_file('index.html')
            return
        
        # Serve static files normally
        else:
            super().do_GET()
    
    def serve_file(self, filename):
        """Serve a specific file with proper content type"""
        try:
            # Check if file exists
            if not os.path.exists(filename):
                self.send_error(404, "File not found")
                return
            
            # Determine content type
            if filename.endswith('.html'):
                content_type = 'text/html; charset=utf-8'
            elif filename.endswith('.css'):
                content_type = 'text/css'
            elif filename.endswith('.js'):
                content_type = 'application/javascript'
            elif filename.endswith('.json'):
                content_type = 'application/json'
            elif filename.endswith('.png'):
                content_type = 'image/png'
            elif filename.endswith('.jpg') or filename.endswith('.jpeg'):
                content_type = 'image/jpeg'
            elif filename.endswith('.gif'):
                content_type = 'image/gif'
            elif filename.endswith('.svg'):
                content_type = 'image/svg+xml'
            else:
                content_type = 'text/plain'
            
            # Read and serve file
            with open(filename, 'rb') as f:
                content = f.read()
            
            self.send_response(200)
            self.send_header('Content-Type', content_type)
            self.send_header('Content-Length', str(len(content)))
            self.end_headers()
            self.wfile.write(content)
            
        except Exception as e:
            self.send_error(500, f"Internal server error: {str(e)}")

def main():
    port = int(os.getenv('PORT', os.getenv('FRONTEND_PORT', 3000)))
    print(f'Starting Crypto Cashier Frontend Server on port {port}')
    print(f'Landing page: http://localhost:{port}/')
    print(f'Dashboard: http://localhost:{port}/dashboard')
    print(f'Health check: http://localhost:{port}/health')
    
    with socketserver.TCPServer(('', port), CashiraFrontendHandler) as httpd:
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print('\nServer stopped')
            sys.exit(0)

if __name__ == '__main__':
    main()
