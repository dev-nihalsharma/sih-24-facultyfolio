import pandas as pd
import numpy as np
from sklearn.datasets import make_regression

# Load the dataset to inspect its structure
file_path = './datasets/appraisal_dataset_v2.csv'
data = pd.read_csv(file_path)


# Extract the correlation matrix and mean values from the original data
mean = data.mean()
corr_matrix = data.corr()

# Generate synthetic data preserving the correlation structure
synthetic_data = np.random.multivariate_normal(mean, corr_matrix, size=10000)

# Convert the synthetic data to a DataFrame
synthetic_df = pd.DataFrame(synthetic_data, columns=data.columns)

# Ensure no negative values where inappropriate (e.g., years, papers)
for col in ['Experience (years)', 'No. of Research Papers Published', 'Seminars Taken', 'Attendance (%)', 'Appraisal (%)']:
    synthetic_df[col] = synthetic_df[col].clip(lower=0)

# Display first few rows of generated data
print(synthetic_df.head())

synthetic_df.to_csv('./datasets/appraisal_dataset_v2_augmented.csv', index=False)