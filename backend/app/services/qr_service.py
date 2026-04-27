import os
import qrcode

BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
QR_DIR = os.path.join(BASE_DIR, "qr_codes")

os.makedirs(QR_DIR, exist_ok=True)

def generate_qr(data: str):
    file_path = os.path.join(QR_DIR, f"{data}.png")

    img = qrcode.make(data)
    img.save(file_path)

    return file_path