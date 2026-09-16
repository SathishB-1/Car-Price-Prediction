from http.server import BaseHTTPRequestHandler
import json
import os

DATA_PATH = os.path.join(os.path.dirname(__file__), "..", "src", "data", "car_model_data.json")

try:
    with open(DATA_PATH, "r") as f:
        MODEL_DATA = json.load(f)
except Exception:
    MODEL_DATA = None

class handler(BaseHTTPRequestHandler):
    def do_POST(self):
        content_length = int(self.headers.get('Content-Length', 0))
        post_data = self.rfile.read(content_length)
        
        try:
            req = json.loads(post_data.decode('utf-8'))
            year = int(req.get('year', 2015))
            kms_driven = int(req.get('kms_driven', 50000))
            name = req.get('name', 'other')
            company = req.get('company', 'other')
            fuel = req.get('fuel', 'Petrol')

            if MODEL_DATA:
                name_enc = MODEL_DATA['name_map'].get(name, MODEL_DATA['name_default'])
                comp_enc = MODEL_DATA['company_map'].get(company, MODEL_DATA['company_default'])
                fuel_enc = MODEL_DATA['fuel_map'].get(fuel, MODEL_DATA['fuel_default'])
                
                coef = MODEL_DATA['coef']
                intercept = MODEL_DATA['intercept']
                
                pred = (year * coef[0]) + (kms_driven * coef[1]) + (name_enc * coef[2]) + (comp_enc * coef[3]) + (fuel_enc * coef[4]) + intercept
                price = max(10000, int(round(pred)))
            else:
                price = 350000

            response = {
                "success": True,
                "predicted_price": price,
                "formatted_price": f"₹{price:,}"
            }

            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            self.wfile.write(json.dumps(response).encode('utf-8'))

        except Exception as e:
            self.send_response(400)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            err_res = {"success": False, "error": str(e)}
            self.wfile.write(json.dumps(err_res).encode('utf-8'))

    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()
