#!/usr/bin/env python

import sys, os
import pandas as pd

files = ["Extractions_9.21.csv", "Seq_9.21.csv", "Tissues_cleaned_headers.csv"]
for csv in files:
    df = pd.read_csv(csv, encoding='ISO-8859-1')
    df.to_json(csv+".json", orient = "records")
    

