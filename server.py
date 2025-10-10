#!/usr/bin/env python3
import os
import sys
import json
import http.server
import socketserver

class CashiraFrontendHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        if self.path == '/health':
            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            health_response = {'status': 'healthy', 'service': 'cashira-frontend', 'version': '1.0.0'}
            self.wfile.write(json.dumps(health_response).encode())
            return
        else:
            super().do_GET()

def main():
    port = int(os.getenv('PORT', os.getenv('FRONTEND_PORT', 3000)))
    print(f'Starting Cashira Frontend Server on port {port}')
    
    with socketserver.TCPServer(('', port), CashiraFrontendHandler) as httpd:
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print('Server stopped')
            sys.exit(0)

if __name__ == '__main__':
    main()
