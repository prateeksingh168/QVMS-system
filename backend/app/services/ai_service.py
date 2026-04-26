def detect_suspicious_pattern(visits):
    if len(visits) > 5:
        return True
    return False