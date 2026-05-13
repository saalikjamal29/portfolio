# 😂 Random Joke Generator

A fun, interactive web application that generates random jokes using the Official Joke API. Built with HTML, CSS, and vanilla JavaScript with a beautiful glassmorphism design.

## 🚀 Features

### Core Functionality
- **Random Joke Generation** - Fetch unlimited jokes from the Official Joke API
- **Multiple Joke Types**:
  - General jokes
  - Programming jokes
  - Knock-knock jokes
- **Copy to Clipboard** - Share jokes with friends easily
- **Share Function** - Native sharing capabilities
- **Favorites System** - Save your favorite jokes locally
- **Statistics Tracking** - Track jokes loaded, favorites saved, and times shared

### Design Features
- **Glassmorphism Design** - Modern, trendy UI
- **Responsive Layout** - Works on all devices
- **Smooth Animations** - Floating emojis and transitions
- **Dark Theme** - Eye-friendly interface
- **Colorful Accents** - Red, Yellow, Green color scheme

## 🛠️ Technologies Used

- **HTML5** - Semantic markup
- **CSS3** - Advanced styling with animations
- **JavaScript (Vanilla)** - API integration and DOM manipulation
- **LocalStorage** - Persistent data storage for favorites and stats
- **Official Joke API** - External API for joke data

## 🎨 Color Scheme

- **Primary:** Red (#FF6B6B)
- **Secondary:** Yellow (#FFD93D)
- **Accent:** Green (#6BCB77)
- **Background:** Dark Blue (#1a1a2e)

## 📦 Installation

1. Clone or download the files
2. Place in your portfolio or project folder
3. Open `index.html` in your browser

```bash
cd joke-generator
open index.html
```

Or use a local server:
```bash
python -m http.server 8000
# Visit: http://localhost:8000/joke-generator
```

## 📖 How to Use

1. **Get a Joke** - Click the "Get Joke" button to fetch a random joke
2. **Choose Joke Type** - Select from General, Programming, or Knock-Knock jokes
3. **Copy Joke** - Click the copy icon to save joke to clipboard
4. **Share Joke** - Click share to send to friends (if supported on your device)
5. **Save Favorite** - Click the heart icon to save favorite jokes
6. **View Favorites** - Go to the Favorites section to see all saved jokes

## 🔗 API Integration

**API Used:** [Official Joke API](https://official-joke-api.appspot.com)

### Endpoints:
- `/jokes/random` - Random joke
- `/jokes/programming/random` - Random programming joke
- `/jokes/knock-knock/random` - Random knock-knock joke

### Example Response:
```json
{
  "id": 123,
  "type": "general",
  "setup": "Why did the scarecrow win an award?",
  "punchline": "He was outstanding in his field!"
}
```

## 💾 Local Storage

The app stores the following data locally:
- **favorites** - Array of saved joke objects
- **jokesLoaded** - Count of jokes generated
- **shareCount** - Number of times jokes were shared

## 📱 Responsive Design

- **Desktop (1200px+)** - Full layout with side filter panel
- **Tablet (768px-1024px)** - Adjusted grid layout
- **Mobile (below 768px)** - Stacked single column layout

## 🎯 Key Functions

### Main Functions
- `generateJoke()` - Fetch and display a random joke
- `copyJoke()` - Copy current joke to clipboard
- `shareJoke()` - Share joke using native sharing
- `toggleFavorite()` - Add/remove from favorites
- `loadFavorites()` - Display all saved favorites
- `setJokeType(type)` - Filter jokes by type

## 🚀 Future Enhancements

- [ ] Search functionality for specific joke keywords
- [ ] Rating system for jokes
- [ ] Export favorites as PDF
- [ ] Dark/Light theme toggle
- [ ] Multi-language support
- [ ] Categories with custom filters
- [ ] User authentication for cloud sync
- [ ] Joke of the day feature

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## 📄 License

This project is open source and available for personal and educational use.

## 🙏 Credits

- **API:** [Official Joke API](https://official-joke-api.appspot.com)
- **Icons:** [Font Awesome](https://fontawesome.com)
- **Design:** Modern web design trends

## 🎉 Enjoy!

Have fun generating jokes and spreading laughter! 😂

---

**Made with 💜 by Saalik Jamal**

"Laughter is the best medicine, and jokes are the prescription!" 💊😆
