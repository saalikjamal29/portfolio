# Iris Flower Classification

## Overview
This project implements a machine learning classifier to predict iris flower species based on their measurements.

## Dataset
- **Source:** Scikit-learn Iris Dataset
- **Samples:** 150 flowers
- **Features:** 4 (Sepal length, Sepal width, Petal length, Petal width)
- **Classes:** 3 (Setosa, Versicolor, Virginica)

## Models Used
1. **Decision Tree Classifier** - 95% Accuracy
2. **Random Forest Classifier** - 97% Accuracy
3. **SVM** - 96% Accuracy

## Results
- **Best Model:** Random Forest
- **Accuracy:** 97%
- **Precision:** 96%
- **Recall:** 97%
- **F1-Score:** 0.97

## How to Run
```bash
python iris_classification.py
```

## Key Learnings
- Data preprocessing and feature scaling
- Train-test split strategy
- Model evaluation metrics
- Hyperparameter tuning
- Handling classification problems

## Technologies
- Python
- Pandas
- Scikit-learn
- Matplotlib
- NumPy

## Project Structure
```
iris-classification/
├── iris_classification.py
├── requirements.txt
└── README.md
```

## Future Enhancements
- Cross-validation for better evaluation
- ROC curve analysis
- Confusion matrix visualization
- Ensemble methods
