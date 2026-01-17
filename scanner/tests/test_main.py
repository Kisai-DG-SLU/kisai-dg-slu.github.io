import pytest
import json
from pathlib import Path
from models import DashboardData

DATA_PATH = Path(__file__).parent.parent.parent / "data" / "projects.json"

def test_data_integrity():
    # Vérifie que le fichier de données est lisible et respecte le schéma Pydantic
    assert DATA_PATH.exists(), f"Data file not found at {DATA_PATH}"
    
    with open(DATA_PATH, "r", encoding="utf-8") as f:
        content = json.load(f)
        data = DashboardData(**content)
    
    assert data.formation.projects_total == 15
    assert len(data.projects) == 15
