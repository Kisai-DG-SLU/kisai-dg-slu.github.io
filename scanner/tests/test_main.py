import pytest
from pathlib import Path
from main import load_data

def test_load_data_exists():
    # Vérifie que le fichier de données est lisible
    # (Le chemin est relatif au dossier scanner dans le script principal)
    data = load_data()
    assert data.formation.projects_total == 15
    assert len(data.projects) == 15
