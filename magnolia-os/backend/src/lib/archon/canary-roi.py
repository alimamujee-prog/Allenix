import sys
import json

def calculate_roi(appointment_volume, no_show_rate):
    avg_treatment_value = 500
    monthly_no_shows = appointment_volume * (no_show_rate / 100)
    monthly_leak = monthly_no_shows * avg_treatment_value
    annual_leak = monthly_leak * 12
    
    # Recovery target (20% improvement)
    monthly_recovered = monthly_leak * 0.20
    annual_recovered = annual_leak * 0.20
    
    return {
        "monthly_leak": monthly_leak,
        "annual_leak": annual_leak,
        "monthly_recovered": monthly_recovered,
        "annual_recovered": annual_recovered
    }

if __name__ == "__main__":
    try:
        vol = float(sys.argv[1])
        rate = float(sys.argv[2])
        results = calculate_roi(vol, rate)
        print(json.dumps(results))
    except Exception as e:
        print(json.dumps({"error": str(e)}))
