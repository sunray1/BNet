#!/usr/bin/env python

import sys, os
import pandas as pd

files = ["Extracts_10.9.csv", "Sequenced_10.9.csv", "Tissues_10.9.csv", "ButterflyNet2.csv"]
for csv in files:
    df = pd.read_csv(csv, encoding='ISO-8859-1')
    df.to_json(csv+".json", orient = "records")
    

