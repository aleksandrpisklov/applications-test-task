#!/bin/sh
set -e

python3 seed_data.py
exec python3 run.py