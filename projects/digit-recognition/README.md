# Handwritten Digit Recognition

## Overview
A deep learning project that recognizes handwritten digits (0-9) using Convolutional Neural Networks (CNN).

## Dataset
- **Source:** MNIST Dataset
- **Training Samples:** 60,000
- **Testing Samples:** 10,000
- **Image Size:** 28x28 pixels (grayscale)

## Architecture
```
Input Layer (28x28)
    ↓
Conv2D (32 filters, 3x3, ReLU)
    ↓
MaxPooling2D (2x2)
    ↓
Conv2D (64 filters, 3x3, ReLU)
    ↓
MaxPooling2D (2x2)
    ↓
Flatten
    ↓
Dense (128 units, ReLU)
    ↓
Dropout (0.5)
    ↓
Dense (10 units, Softmax)
```

## Results
- **Accuracy:** 99.2%
- **Loss:** 0.032
- **Training Time:** ~2 minutes (on CPU)
- **Validation Accuracy:** 98.8%

## How to Run
```bash
python digit_recognition.py
```

## Key Techniques
- Data normalization (pixel values 0-1)
- Batch processing
- Dropout for regularization
- Adam optimizer
- Categorical cross-entropy loss
- Early stopping

## Technologies
- Python
- TensorFlow / Keras
- NumPy
- Matplotlib

## Project Structure
```
digit-recognition/
├── digit_recognition.py
├── requirements.txt
└── README.md
```

## Future Improvements
- Implement transfer learning
- Build a real-time web interface
- Deploy on cloud platform (Heroku, AWS)
- Add batch prediction capability
