export const foodDatabase = [
  // 🥚 EGGS CATEGORY
  {
    id: 1,
    name: "Boiled Egg",
    category: "Eggs",
    emoji: "🥚",
    portions: {
      "1 egg": { calories: 70, protein: 6 },
      "2 eggs": { calories: 140, protein: 12 },
      "3 eggs": { calories: 210, protein: 18 }
    }
  },
  {
    id: 2,
    name: "Egg Omelette",
    category: "Eggs",
    emoji: "🥚",
    portions: {
      "1 egg omelette": { calories: 100, protein: 7 },
      "2 egg omelette": { calories: 180, protein: 12 },
      "3 egg omelette": { calories: 260, protein: 18 }
    }
  },
  {
    id: 3,
    name: "Masala Omelette",
    category: "Eggs",
    emoji: "🥚",
    portions: {
      "1 egg masala omelette": { calories: 110, protein: 7.5 },
      "2 egg masala omelette": { calories: 200, protein: 13 },
      "3 egg masala omelette": { calories: 280, protein: 19 }
    }
  },
  {
    id: 4,
    name: "Bread Omelette",
    category: "Eggs",
    emoji: "🥚",
    portions: {
      "1 pair (2 breads + 1 egg)": { calories: 200, protein: 10 },
      "Heavy (2 breads + 2 eggs)": { calories: 280, protein: 16 }
    }
  },
  {
    id: 5,
    name: "Egg Bhurji",
    category: "Eggs",
    emoji: "🥚",
    portions: {
      "2 eggs bhurji": { calories: 220, protein: 15 },
      "3 eggs bhurji": { calories: 300, protein: 22 }
    }
  },
  {
    id: 6,
    name: "Egg Sandwich",
    category: "Eggs",
    emoji: "🥚",
    portions: {
      "1 Sandwich (2 breads)": { calories: 250, protein: 12 },
      "2 Sandwiches (4 breads)": { calories: 500, protein: 24 }
    }
  },

  // 🥛 DAIRY CATEGORY
  {
    id: 7,
    name: "Milk",
    category: "Dairy",
    emoji: "🥛",
    portions: {
      "1 Cup (150ml)": { calories: 90, protein: 5 },
      "1 Glass (250ml)": { calories: 150, protein: 8 },
      "1 Large Glass (350ml)": { calories: 210, protein: 11 }
    }
  },
  {
    id: 8,
    name: "Chocolate Milk",
    category: "Dairy",
    emoji: "🥛",
    portions: {
      "1 Cup (150ml)": { calories: 120, protein: 5 },
      "1 Glass (250ml)": { calories: 200, protein: 8 }
    }
  },
  {
    id: 9,
    name: "Curd",
    category: "Dairy",
    emoji: "🥛",
    portions: {
      "Small Bowl": { calories: 60, protein: 3 },
      "Medium Bowl": { calories: 100, protein: 5 }
    }
  },
  {
    id: 10,
    name: "Sweet Curd",
    category: "Dairy",
    emoji: "🥛",
    portions: {
      "Small Bowl": { calories: 90, protein: 3 },
      "Medium Bowl": { calories: 150, protein: 5 }
    }
  },
  {
    id: 11,
    name: "Greek Yogurt",
    category: "Dairy",
    emoji: "🥛",
    portions: {
      "Small Bowl": { calories: 80, protein: 8 },
      "1 Standard Cup (150g)": { calories: 120, protein: 13 }
    }
  },
  {
    id: 12,
    name: "Lassi",
    category: "Dairy",
    emoji: "🥛",
    portions: {
      "1 Glass (250ml)": { calories: 180, protein: 6 },
      "1 Large Glass (350ml)": { calories: 250, protein: 8 }
    }
  },
  {
    id: 13,
    name: "Buttermilk",
    category: "Dairy",
    emoji: "🥛",
    portions: {
      "1 Glass (250ml)": { calories: 60, protein: 3 },
      "1 Large Glass (350ml)": { calories: 90, protein: 5 }
    }
  },
  {
    id: 14,
    name: "Paneer",
    category: "Dairy",
    emoji: "🧀",
    portions: {
      "50g cubes": { calories: 130, protein: 8 },
      "100g cubes": { calories: 260, protein: 16 }
    }
  },
  {
    id: 15,
    name: "Paneer Bhurji",
    category: "Dairy",
    emoji: "🧀",
    portions: {
      "Medium Bowl": { calories: 300, protein: 18 },
      "Medium-Large Bowl": { calories: 420, protein: 25 }
    }
  },
  {
    id: 16,
    name: "Paneer Sandwich",
    category: "Dairy",
    emoji: "🍞",
    portions: {
      "1 Sandwich (2 breads)": { calories: 320, protein: 15 },
      "2 Sandwiches (4 breads)": { calories: 640, protein: 30 }
    }
  },

  // 🫘 PROTEIN SOURCES & DALS
  {
    id: 17,
    name: "Rajma",
    category: "Protein Sources",
    emoji: "🫘",
    portions: {
      "Medium Bowl": { calories: 180, protein: 9 },
      "Large Bowl": { calories: 260, protein: 14 }
    }
  },
  {
    id: 18,
    name: "Rajma Rice",
    category: "Protein Sources",
    emoji: "🍚",
    portions: {
      "Half Plate": { calories: 350, protein: 10 },
      "Full Plate": { calories: 550, protein: 18 }
    }
  },
  {
    id: 19,
    name: "Rajma Roti",
    category: "Protein Sources",
    emoji: "🫓",
    portions: {
      "1 plate (2 Rotis + Medium Bowl Rajma)": { calories: 320, protein: 14 },
      "Heavy (3 Rotis + Large Bowl Rajma)": { calories: 470, protein: 21 }
    }
  },
  {
    id: 20,
    name: "Chole",
    category: "Protein Sources",
    emoji: "🫘",
    portions: {
      "Medium Bowl": { calories: 190, protein: 8 },
      "Large Bowl": { calories: 280, protein: 12 }
    }
  },
  {
    id: 21,
    name: "Chole Rice",
    category: "Protein Sources",
    emoji: "🍚",
    portions: {
      "Half Plate": { calories: 360, protein: 9 },
      "Full Plate": { calories: 560, protein: 17 }
    }
  },
  {
    id: 22,
    name: "Chole Roti",
    category: "Protein Sources",
    emoji: "🫓",
    portions: {
      "1 plate (2 Rotis + Medium Bowl Chole)": { calories: 330, protein: 13 },
      "Heavy (3 Rotis + Large Bowl Chole)": { calories: 490, protein: 19.5 }
    }
  },
  {
    id: 23,
    name: "Dal (Yellow/Moong/Toor)",
    category: "Protein Sources",
    emoji: "🍲",
    portions: {
      "Small Bowl": { calories: 80, protein: 4 },
      "Medium Bowl": { calories: 130, protein: 7 },
      "Large Bowl": { calories: 190, protein: 10 }
    }
  },
  {
    id: 24,
    name: "Dal Rice",
    category: "Protein Sources",
    emoji: "🍚",
    portions: {
      "Half Plate": { calories: 300, protein: 8 },
      "Full Plate": { calories: 480, protein: 14 }
    }
  },
  {
    id: 25,
    name: "Dal Roti",
    category: "Protein Sources",
    emoji: "🫓",
    portions: {
      "1 plate (2 Rotis + Medium Bowl Dal)": { calories: 270, protein: 12 },
      "Heavy (3 Rotis + Large Bowl Dal)": { calories: 400, protein: 17.5 }
    }
  },
  {
    id: 26,
    name: "Soya Chunks",
    category: "Protein Sources",
    emoji: "🫘",
    portions: {
      "Small Bowl (Boiled, ~30g raw)": { calories: 100, protein: 15 },
      "Medium Bowl (Boiled, ~50g raw)": { calories: 170, protein: 26 }
    }
  },
  {
    id: 27,
    name: "Soya Curry",
    category: "Protein Sources",
    emoji: "🍲",
    portions: {
      "Medium Bowl": { calories: 200, protein: 20 },
      "Large Bowl": { calories: 300, protein: 30 }
    }
  },
  {
    id: 28,
    name: "Soya Rice",
    category: "Protein Sources",
    emoji: "🍚",
    portions: {
      "Half Plate": { calories: 350, protein: 18 },
      "Full Plate": { calories: 580, protein: 32 }
    }
  },
  {
    id: 29,
    name: "Mixed Sprouts",
    category: "Protein Sources",
    emoji: "🌱",
    portions: {
      "Small Bowl": { calories: 80, protein: 6 },
      "Medium Bowl": { calories: 130, protein: 10 }
    }
  },
  {
    id: 30,
    name: "Sprouts Salad",
    category: "Protein Sources",
    emoji: "🥗",
    portions: {
      "Medium Bowl": { calories: 140, protein: 10 },
      "Medium-Large Bowl": { calories: 210, protein: 16 }
    }
  },
  {
    id: 31,
    name: "Dal Makhani",
    category: "Protein Sources",
    emoji: "🍲",
    portions: {
      "Small Bowl": { calories: 150, protein: 5 },
      "Medium Bowl": { calories: 240, protein: 8 },
      "Large Bowl": { calories: 350, protein: 12 }
    }
  },
  {
    id: 32,
    name: "Dal Palak",
    category: "Protein Sources",
    emoji: "🍲",
    portions: {
      "Small Bowl": { calories: 90, protein: 5 },
      "Medium Bowl": { calories: 150, protein: 8 },
      "Large Bowl": { calories: 220, protein: 12 }
    }
  },
  {
    id: 33,
    name: "Dal Tadka",
    category: "Protein Sources",
    emoji: "🍲",
    portions: {
      "Small Bowl": { calories: 100, protein: 4.5 },
      "Medium Bowl": { calories: 160, protein: 7.5 },
      "Large Bowl": { calories: 230, protein: 11 }
    }
  },

  // 🍚 RICE CATEGORY
  {
    id: 34,
    name: "Plain Rice",
    category: "Rice",
    emoji: "🍚",
    portions: {
      "Medium Bowl": { calories: 200, protein: 4 },
      "Half Plate": { calories: 260, protein: 5.5 },
      "Full Plate": { calories: 400, protein: 8 }
    }
  },
  {
    id: 35,
    name: "Jeera Rice",
    category: "Rice",
    emoji: "🍚",
    portions: {
      "Medium Bowl": { calories: 220, protein: 4 },
      "Half Plate": { calories: 280, protein: 5.5 },
      "Full Plate": { calories: 440, protein: 8 }
    }
  },
  {
    id: 36,
    name: "Curd Rice",
    category: "Rice",
    emoji: "🍚",
    portions: {
      "Medium Bowl": { calories: 240, protein: 6 },
      "Medium-Large Bowl": { calories: 360, protein: 10 }
    }
  },
  {
    id: 37,
    name: "Lemon Rice",
    category: "Rice",
    emoji: "🍚",
    portions: {
      "Medium Bowl": { calories: 230, protein: 4.5 },
      "Half Plate": { calories: 300, protein: 6 },
      "Full Plate": { calories: 460, protein: 9 }
    }
  },
  {
    id: 38,
    name: "Veg Pulao",
    category: "Rice",
    emoji: "🍚",
    portions: {
      "Medium-Large Bowl": { calories: 280, protein: 6 },
      "Half Plate": { calories: 320, protein: 7 },
      "Full Plate": { calories: 480, protein: 10 }
    }
  },
  {
    id: 39,
    name: "Paneer Pulao",
    category: "Rice",
    emoji: "🍚",
    portions: {
      "Medium-Large Bowl": { calories: 340, protein: 13 },
      "Half Plate": { calories: 400, protein: 15 },
      "Full Plate": { calories: 550, protein: 20 }
    }
  },
  {
    id: 40,
    name: "Khichdi",
    category: "Rice",
    emoji: "🍲",
    portions: {
      "Medium Bowl": { calories: 200, protein: 6 },
      "Medium-Large Bowl": { calories: 300, protein: 10 },
      "Large Bowl": { calories: 400, protein: 13 }
    }
  },

  // 🫓 ROTI & PARATHA
  {
    id: 41,
    name: "Roti / Chapati",
    category: "Roti & Paratha",
    emoji: "🫓",
    portions: {
      "1 Roti / Chapati": { calories: 70, protein: 2.5 },
      "2 Rotis / Chapatis": { calories: 140, protein: 5 },
      "3 Rotis / Chapatis": { calories: 210, protein: 7.5 },
      "4 Rotis / Chapatis": { calories: 280, protein: 10 }
    }
  },
  {
    id: 42,
    name: "Aloo Paratha",
    category: "Roti & Paratha",
    emoji: "🫓",
    portions: {
      "1 Paratha": { calories: 180, protein: 4 },
      "2 Parathas": { calories: 360, protein: 8 }
    }
  },
  {
    id: 43,
    name: "Paneer Paratha",
    category: "Roti & Paratha",
    emoji: "🫓",
    portions: {
      "1 Paratha": { calories: 220, protein: 8 },
      "2 Parathas": { calories: 440, protein: 16 }
    }
  },
  {
    id: 44,
    name: "Gobi Paratha",
    category: "Roti & Paratha",
    emoji: "🫓",
    portions: {
      "1 Paratha": { calories: 160, protein: 4 },
      "2 Parathas": { calories: 320, protein: 8 }
    }
  },
  {
    id: 45,
    name: "Mixed Veg Paratha",
    category: "Roti & Paratha",
    emoji: "🫓",
    portions: {
      "1 Paratha": { calories: 170, protein: 4 },
      "2 Parathas": { calories: 340, protein: 8 }
    }
  },
  {
    id: 46,
    name: "Methi Thepla",
    category: "Roti & Paratha",
    emoji: "🫓",
    portions: {
      "1 Thepla": { calories: 100, protein: 3 },
      "2 Theplas": { calories: 200, protein: 6 },
      "3 Theplas": { calories: 300, protein: 9 }
    }
  },

  // 🌾 BREAKFAST CATEGORY
  {
    id: 47,
    name: "Poha",
    category: "Breakfast",
    emoji: "🥣",
    portions: {
      "Small Bowl": { calories: 150, protein: 3 },
      "Medium Bowl": { calories: 220, protein: 4.5 },
      "Medium-Large Bowl": { calories: 320, protein: 6.5 }
    }
  },
  {
    id: 48,
    name: "Upma",
    category: "Breakfast",
    emoji: "🥣",
    portions: {
      "Small Bowl": { calories: 140, protein: 3 },
      "Medium Bowl": { calories: 210, protein: 4.5 },
      "Medium-Large Bowl": { calories: 300, protein: 6.5 }
    }
  },
  {
    id: 49,
    name: "Dalia",
    category: "Breakfast",
    emoji: "🥣",
    portions: {
      "Small Bowl": { calories: 130, protein: 4.5 },
      "Medium Bowl": { calories: 200, protein: 7 },
      "Medium-Large Bowl": { calories: 280, protein: 10 }
    }
  },
  {
    id: 50,
    name: "Oats",
    category: "Breakfast",
    emoji: "🥣",
    portions: {
      "Small Bowl": { calories: 150, protein: 5 },
      "Medium-Large Bowl": { calories: 320, protein: 11 }
    }
  },
  {
    id: 51,
    name: "Masala Oats",
    category: "Breakfast",
    emoji: "🥣",
    portions: {
      "Small Bowl": { calories: 140, protein: 4.5 },
      "Medium-Large Bowl": { calories: 310, protein: 10 }
    }
  },
  {
    id: 52,
    name: "Besan Chilla",
    category: "Breakfast",
    emoji: "🥞",
    portions: {
      "1 Chilla": { calories: 120, protein: 6 },
      "2 Chillas": { calories: 240, protein: 12 },
      "3 Chillas": { calories: 360, protein: 18 }
    }
  },
  {
    id: 53,
    name: "Moong Dal Chilla",
    category: "Breakfast",
    emoji: "🥞",
    portions: {
      "1 Chilla": { calories: 130, protein: 7 },
      "2 Chillas": { calories: 260, protein: 14 },
      "3 Chillas": { calories: 390, protein: 21 }
    }
  },
  {
    id: 54,
    name: "Veg Seviyan (Vermicelli)",
    category: "Breakfast",
    emoji: "🍝",
    portions: {
      "Small Bowl": { calories: 130, protein: 3 },
      "Medium Bowl": { calories: 200, protein: 4.5 },
      "Medium-Large Bowl": { calories: 280, protein: 6 }
    }
  },
  {
    id: 55,
    name: "Sabudana Khichdi",
    category: "Breakfast",
    emoji: "🥣",
    portions: {
      "Small Bowl": { calories: 180, protein: 2 },
      "Medium Bowl": { calories: 300, protein: 3.5 },
      "Medium-Large Bowl": { calories: 420, protein: 5 }
    }
  },
  {
    id: 56,
    name: "Vegetable Sandwich",
    category: "Breakfast",
    emoji: "🍞",
    portions: {
      "1 Sandwich (2 breads)": { calories: 200, protein: 5 },
      "2 Sandwiches (4 breads)": { calories: 400, protein: 10 }
    }
  },
  {
    id: 57,
    name: "Bread Butter",
    category: "Breakfast",
    emoji: "🍞",
    portions: {
      "1 pair (2 breads + butter)": { calories: 220, protein: 4 },
      "2 pairs (4 breads + butter)": { calories: 440, protein: 8 }
    }
  },
  {
    id: 58,
    name: "Bread Jam",
    category: "Breakfast",
    emoji: "🍞",
    portions: {
      "1 pair (2 breads + jam)": { calories: 200, protein: 4 },
      "2 pairs (4 breads + jam)": { calories: 400, protein: 8 }
    }
  },
  {
    id: 59,
    name: "Peanut Butter Sandwich",
    category: "Breakfast",
    emoji: "🍞",
    portions: {
      "1 Sandwich (2 breads + 2 tbsp PB)": { calories: 350, protein: 12 },
      "2 Sandwiches (4 breads + 4 tbsp PB)": { calories: 700, protein: 24 }
    }
  },
  {
    id: 60,
    name: "Cheese Sandwich",
    category: "Breakfast",
    emoji: "🍞",
    portions: {
      "1 Sandwich (2 breads + 1 slice cheese)": { calories: 260, protein: 9 },
      "2 Sandwiches (4 breads + 2 slices cheese)": { calories: 520, protein: 18 }
    }
  },

  // 🍌 FRUITS
  {
    id: 61,
    name: "Banana",
    category: "Fruits",
    emoji: "🍌",
    portions: {
      "1 Small": { calories: 80, protein: 1 },
      "1 Medium": { calories: 105, protein: 1.3 },
      "1 Large": { calories: 130, protein: 1.6 },
      "2 Medium Bananas": { calories: 210, protein: 2.6 }
    }
  },
  {
    id: 62,
    name: "Apple",
    category: "Fruits",
    emoji: "🍎",
    portions: {
      "1 Small": { calories: 60, protein: 0.3 },
      "1 Medium": { calories: 95, protein: 0.5 },
      "1 Large": { calories: 130, protein: 0.7 }
    }
  },
  {
    id: 63,
    name: "Mango",
    category: "Fruits",
    emoji: "🥭",
    portions: {
      "Half Mango": { calories: 100, protein: 1 },
      "1 Whole Medium Mango": { calories: 200, protein: 2 }
    }
  },
  {
    id: 64,
    name: "Orange",
    category: "Fruits",
    emoji: "🍊",
    portions: {
      "1 Small": { calories: 45, protein: 0.9 },
      "1 Medium": { calories: 65, protein: 1.3 },
      "1 Large": { calories: 90, protein: 1.8 }
    }
  },
  {
    id: 65,
    name: "Papaya",
    category: "Fruits",
    emoji: "🥭",
    portions: {
      "1 Small Bowl (cubed)": { calories: 60, protein: 0.6 },
      "1 Medium Bowl (cubed)": { calories: 120, protein: 1.2 }
    }
  },
  {
    id: 66,
    name: "Guava",
    category: "Fruits",
    emoji: "🍏",
    portions: {
      "1 Medium Guava": { calories: 50, protein: 1.4 },
      "1 Large Guava": { calories: 90, protein: 2.5 }
    }
  },
  {
    id: 67,
    name: "Pomegranate",
    category: "Fruits",
    emoji: "🍎",
    portions: {
      "Half Pomegranate (seeds)": { calories: 65, protein: 1.2 },
      "1 Whole Pomegranate (seeds)": { calories: 130, protein: 2.5 }
    }
  },
  {
    id: 68,
    name: "Watermelon",
    category: "Fruits",
    emoji: "🍉",
    portions: {
      "1 Slice": { calories: 45, protein: 0.9 },
      "Medium Bowl (cubed)": { calories: 90, protein: 1.8 }
    }
  },

  // 🥜 SNACKS
  {
    id: 69,
    name: "Peanuts",
    category: "Snacks",
    emoji: "🥜",
    portions: {
      "1 Handful (~30g)": { calories: 160, protein: 7 },
      "Small Bowl (~50g)": { calories: 280, protein: 12 }
    }
  },
  {
    id: 70,
    name: "Roasted Peanuts",
    category: "Snacks",
    emoji: "🥜",
    portions: {
      "1 Handful (~30g)": { calories: 165, protein: 7.2 },
      "Small Bowl (~50g)": { calories: 290, protein: 12.5 }
    }
  },
  {
    id: 71,
    name: "Peanut Butter",
    category: "Snacks",
    emoji: "🥜",
    portions: {
      "1 Tbsp": { calories: 95, protein: 3.5 },
      "2 Tbsp": { calories: 190, protein: 7 }
    }
  },
  {
    id: 72,
    name: "Mixed Nuts",
    category: "Snacks",
    emoji: "🌰",
    portions: {
      "1 Handful (~30g)": { calories: 170, protein: 5.5 },
      "Small Bowl (~50g)": { calories: 280, protein: 9 }
    }
  },
  {
    id: 73,
    name: "Almonds",
    category: "Snacks",
    emoji: "🌰",
    portions: {
      "5-6 Almonds": { calories: 40, protein: 1.5 },
      "1 Handful (~30g)": { calories: 165, protein: 6 }
    }
  },
  {
    id: 74,
    name: "Cashews",
    category: "Snacks",
    emoji: "🌰",
    portions: {
      "5-6 Cashews": { calories: 50, protein: 1.6 },
      "1 Handful (~30g)": { calories: 160, protein: 5 }
    }
  },
  {
    id: 75,
    name: "Walnuts",
    category: "Snacks",
    emoji: "🌰",
    portions: {
      "2 Whole Walnuts": { calories: 50, protein: 1.2 },
      "1 Handful (~30g)": { calories: 195, protein: 4.5 }
    }
  },
  {
    id: 76,
    name: "Trail Mix",
    category: "Snacks",
    emoji: "🌰",
    portions: {
      "1 Handful (~30g)": { calories: 140, protein: 4 },
      "Small Bowl (~50g)": { calories: 240, protein: 6.5 }
    }
  },
  {
    id: 77,
    name: "Dates",
    category: "Snacks",
    emoji: "🌴",
    portions: {
      "1 Date": { calories: 20, protein: 0.2 },
      "3 Dates": { calories: 60, protein: 0.6 },
      "5 Dates": { calories: 100, protein: 1 }
    }
  },
  {
    id: 78,
    name: "Raisins",
    category: "Snacks",
    emoji: "🍇",
    portions: {
      "1 Tbsp": { calories: 40, protein: 0.4 },
      "1 Handful (~30g)": { calories: 90, protein: 0.9 }
    }
  },

  // 🥤 DRINKS
  {
    id: 79,
    name: "Banana Shake",
    category: "Drinks",
    emoji: "🥤",
    portions: {
      "1 Glass (250ml)": { calories: 220, protein: 7 },
      "1 Large Glass (350ml)": { calories: 320, protein: 10 }
    }
  },
  {
    id: 80,
    name: "Banana Peanut Butter Shake",
    category: "Drinks",
    emoji: "🥤",
    portions: {
      "1 Glass (250ml)": { calories: 340, protein: 12 },
      "1 Large Glass (350ml)": { calories: 480, protein: 16 }
    }
  },
  {
    id: 81,
    name: "Mango Shake",
    category: "Drinks",
    emoji: "🥤",
    portions: {
      "1 Glass (250ml)": { calories: 200, protein: 6 },
      "1 Large Glass (350ml)": { calories: 280, protein: 8 }
    }
  },
  {
    id: 82,
    name: "Milkshake",
    category: "Drinks",
    emoji: "🥤",
    portions: {
      "1 Glass (250ml)": { calories: 240, protein: 6.5 },
      "1 Large Glass (350ml)": { calories: 350, protein: 9 }
    }
  },
  {
    id: 83,
    name: "Protein Shake",
    category: "Drinks",
    emoji: "🥤",
    portions: {
      "1 Scoop with Water (250ml)": { calories: 120, protein: 24 },
      "1 Scoop with Milk (250ml)": { calories: 270, protein: 32 }
    }
  },
  {
    id: 84,
    name: "Sattu Drink",
    category: "Drinks",
    emoji: "🥤",
    portions: {
      "1 Glass (250ml)": { calories: 120, protein: 6 },
      "1 Large Glass (350ml)": { calories: 180, protein: 9 }
    }
  },

  // 🍜 COMFORT FOODS & WESTERN
  {
    id: 85,
    name: "Maggi",
    category: "Comfort Foods",
    emoji: "🍜",
    portions: {
      "1 Packet (Regular)": { calories: 310, protein: 6 },
      "2 Packets (Large)": { calories: 620, protein: 12 }
    }
  },
  {
    id: 86,
    name: "Vegetable Maggi",
    category: "Comfort Foods",
    emoji: "🍜",
    portions: {
      "1 Packet with Veggies": { calories: 350, protein: 7.5 },
      "2 Packets with Veggies": { calories: 680, protein: 15 }
    }
  },
  {
    id: 87,
    name: "Pasta",
    category: "Comfort Foods",
    emoji: "🍝",
    portions: {
      "Half Plate": { calories: 240, protein: 6.5 },
      "Full Plate": { calories: 450, protein: 12 }
    }
  },
  {
    id: 88,
    name: "White Sauce Pasta",
    category: "Comfort Foods",
    emoji: "🍝",
    portions: {
      "Half Plate": { calories: 320, protein: 8 },
      "Full Plate": { calories: 600, protein: 16 }
    }
  },
  {
    id: 89,
    name: "Red Sauce Pasta",
    category: "Comfort Foods",
    emoji: "🍝",
    portions: {
      "Half Plate": { calories: 260, protein: 6.5 },
      "Full Plate": { calories: 480, protein: 13 }
    }
  },
  {
    id: 90,
    name: "Pizza",
    category: "Comfort Foods",
    emoji: "🍕",
    portions: {
      "1 Slice (Regular)": { calories: 200, protein: 8 },
      "Small/Pan Pizza (4 Slices)": { calories: 800, protein: 32 },
      "Medium Pizza (6 Slices)": { calories: 1200, protein: 48 }
    }
  },
  {
    id: 91,
    name: "Veg Burger",
    category: "Comfort Foods",
    emoji: "🍔",
    portions: {
      "1 Regular Burger": { calories: 350, protein: 10 },
      "1 Large/Double Patty Burger": { calories: 550, protein: 16 }
    }
  },

  // 🍪 SWEETS
  {
    id: 92,
    name: "Kheer",
    category: "Sweets",
    emoji: "🥣",
    portions: {
      "Small Bowl": { calories: 180, protein: 4 },
      "Medium Bowl": { calories: 280, protein: 7 }
    }
  },
  {
    id: 93,
    name: "Halwa",
    category: "Sweets",
    emoji: "🥣",
    portions: {
      "Small Bowl": { calories: 220, protein: 3.5 },
      "Medium Bowl": { calories: 380, protein: 6 }
    }
  },
  {
    id: 94,
    name: "Ice Cream",
    category: "Sweets",
    emoji: "🍦",
    portions: {
      "1 Scoop": { calories: 140, protein: 2 },
      "2 Scoops": { calories: 280, protein: 4 }
    }
  },
  {
    id: 95,
    name: "Chocolate",
    category: "Sweets",
    emoji: "🍫",
    portions: {
      "1 Small Bar (~15g)": { calories: 80, protein: 1 },
      "1 Regular Bar (~40g)": { calories: 210, protein: 2.5 }
    }
  },
  {
    id: 96,
    name: "Ladoo",
    category: "Sweets",
    emoji: "🧁",
    portions: {
      "1 Piece": { calories: 150, protein: 2.5 },
      "2 Pieces": { calories: 300, protein: 5 }
    }
  },
  {
    id: 97,
    name: "Barfi",
    category: "Sweets",
    emoji: "🧁",
    portions: {
      "1 Piece": { calories: 120, protein: 2.5 },
      "2 Pieces": { calories: 240, protein: 5 }
    }
  },

  // 🍲 SABZIS CATEGORY
  {
    id: 98,
    name: "Kadhai Paneer",
    category: "Sabzis",
    emoji: "🥘",
    portions: {
      "Small Bowl": { calories: 160, protein: 8 },
      "Medium Bowl": { calories: 250, protein: 14 },
      "Large Bowl": { calories: 350, protein: 20 }
    }
  },
  {
    id: 99,
    name: "Palak Paneer",
    category: "Sabzis",
    emoji: "🥘",
    portions: {
      "Small Bowl": { calories: 140, protein: 7 },
      "Medium Bowl": { calories: 220, protein: 12 },
      "Large Bowl": { calories: 320, protein: 18 }
    }
  },
  {
    id: 100,
    name: "Matar Paneer",
    category: "Sabzis",
    emoji: "🥘",
    portions: {
      "Small Bowl": { calories: 150, protein: 7.5 },
      "Medium Bowl": { calories: 230, protein: 13 },
      "Large Bowl": { calories: 330, protein: 18.5 }
    }
  },
  {
    id: 101,
    name: "Paneer Butter Masala",
    category: "Sabzis",
    emoji: "🥘",
    portions: {
      "Small Bowl": { calories: 190, protein: 7 },
      "Medium Bowl": { calories: 320, protein: 12 },
      "Large Bowl": { calories: 450, protein: 17 }
    }
  },
  {
    id: 102,
    name: "Shahi Paneer",
    category: "Sabzis",
    emoji: "🥘",
    portions: {
      "Small Bowl": { calories: 200, protein: 8 },
      "Medium Bowl": { calories: 340, protein: 13 },
      "Large Bowl": { calories: 480, protein: 18 }
    }
  },
  {
    id: 103,
    name: "Bhindi Masala",
    category: "Sabzis",
    emoji: "🥗",
    portions: {
      "Small Bowl": { calories: 90, protein: 2 },
      "Medium Bowl": { calories: 150, protein: 3.5 },
      "Large Bowl": { calories: 220, protein: 5 }
    }
  },
  {
    id: 104,
    name: "Aloo Tamatar ki Sabzi",
    category: "Sabzis",
    emoji: "🍲",
    portions: {
      "Small Bowl": { calories: 100, protein: 2 },
      "Medium Bowl": { calories: 170, protein: 3.5 },
      "Large Bowl": { calories: 250, protein: 5 }
    }
  },
  {
    id: 105,
    name: "Aloo Pyaaz",
    category: "Sabzis",
    emoji: "🍲",
    portions: {
      "Small Bowl": { calories: 110, protein: 2.2 },
      "Medium Bowl": { calories: 180, protein: 3.8 },
      "Large Bowl": { calories: 260, protein: 5.5 }
    }
  },
  {
    id: 106,
    name: "Jeera Aloo",
    category: "Sabzis",
    emoji: "🥔",
    portions: {
      "Small Bowl": { calories: 120, protein: 2 },
      "Medium Bowl": { calories: 200, protein: 3.5 },
      "Large Bowl": { calories: 280, protein: 5 }
    }
  },
  {
    id: 107,
    name: "Aloo Matar",
    category: "Sabzis",
    emoji: "🥔",
    portions: {
      "Small Bowl": { calories: 110, protein: 3 },
      "Medium Bowl": { calories: 180, protein: 5 },
      "Large Bowl": { calories: 260, protein: 7 }
    }
  },
  {
    id: 108,
    name: "Shimla Mirch Aloo",
    category: "Sabzis",
    emoji: "🫑",
    portions: {
      "Small Bowl": { calories: 105, protein: 2.1 },
      "Medium Bowl": { calories: 175, protein: 3.6 },
      "Large Bowl": { calories: 255, protein: 5.2 }
    }
  },
  {
    id: 109,
    name: "Aloo Gobi",
    category: "Sabzis",
    emoji: "🥦",
    portions: {
      "Small Bowl": { calories: 110, protein: 2.5 },
      "Medium Bowl": { calories: 180, protein: 4 },
      "Large Bowl": { calories: 260, protein: 6 }
    }
  },
  {
    id: 110,
    name: "Baingan Aloo",
    category: "Sabzis",
    emoji: "🍆",
    portions: {
      "Small Bowl": { calories: 110, protein: 2 },
      "Medium Bowl": { calories: 180, protein: 3.5 },
      "Large Bowl": { calories: 250, protein: 5 }
    }
  },
  {
    id: 111,
    name: "Baingan Bharta",
    category: "Sabzis",
    emoji: "🍆",
    portions: {
      "Small Bowl": { calories: 95, protein: 1.8 },
      "Medium Bowl": { calories: 160, protein: 3 },
      "Large Bowl": { calories: 230, protein: 4.5 }
    }
  },
  {
    id: 112,
    name: "Lauki ki Sabzi",
    category: "Sabzis",
    emoji: "🥒",
    portions: {
      "Small Bowl": { calories: 60, protein: 1.2 },
      "Medium Bowl": { calories: 100, protein: 2 },
      "Large Bowl": { calories: 150, protein: 3 }
    }
  },
  {
    id: 113,
    name: "Torhi ki Sabzi",
    category: "Sabzis",
    emoji: "🥒",
    portions: {
      "Small Bowl": { calories: 50, protein: 1 },
      "Medium Bowl": { calories: 80, protein: 1.5 },
      "Large Bowl": { calories: 120, protein: 2.5 }
    }
  },
  {
    id: 114,
    name: "Parwal ki Sabzi",
    category: "Sabzis",
    emoji: "🥒",
    portions: {
      "Small Bowl": { calories: 70, protein: 1.5 },
      "Medium Bowl": { calories: 110, protein: 2.5 },
      "Large Bowl": { calories: 160, protein: 3.5 }
    }
  },
  {
    id: 115,
    name: "Karela (Bitter Gourd)",
    category: "Sabzis",
    emoji: "🥒",
    portions: {
      "Small Bowl": { calories: 90, protein: 2 },
      "Medium Bowl": { calories: 150, protein: 3.5 }
    }
  },
  {
    id: 116,
    name: "Patta Gobi Matar (Cabbage)",
    category: "Sabzis",
    emoji: "🥬",
    portions: {
      "Small Bowl": { calories: 70, protein: 2.5 },
      "Medium Bowl": { calories: 120, protein: 4 },
      "Large Bowl": { calories: 180, protein: 6 }
    }
  },
  {
    id: 117,
    name: "Arbi ki Sabzi",
    category: "Sabzis",
    emoji: "🥔",
    portions: {
      "Small Bowl": { calories: 130, protein: 2 },
      "Medium Bowl": { calories: 210, protein: 3.5 },
      "Large Bowl": { calories: 290, protein: 5 }
    }
  },
  {
    id: 118,
    name: "Tinda Masala",
    category: "Sabzis",
    emoji: "🥒",
    portions: {
      "Small Bowl": { calories: 80, protein: 1.5 },
      "Medium Bowl": { calories: 130, protein: 2.5 }
    }
  },
  {
    id: 119,
    name: "Kathal Sabzi (Jackfruit)",
    category: "Sabzis",
    emoji: "🍲",
    portions: {
      "Small Bowl": { calories: 120, protein: 3 },
      "Medium Bowl": { calories: 190, protein: 5 },
      "Large Bowl": { calories: 270, protein: 7 }
    }
  },

  // 🥣 RAITAS
  {
    id: 120,
    name: "Boondi Raita",
    category: "Raitas",
    emoji: "🥣",
    portions: {
      "Small Bowl": { calories: 80, protein: 3 },
      "Medium Bowl": { calories: 130, protein: 5 }
    }
  },
  {
    id: 121,
    name: "Cucumber Raita",
    category: "Raitas",
    emoji: "🥣",
    portions: {
      "Small Bowl": { calories: 50, protein: 3 },
      "Medium Bowl": { calories: 80, protein: 5 }
    }
  },
  {
    id: 122,
    name: "Jeera Raita",
    category: "Raitas",
    emoji: "🥣",
    portions: {
      "Small Bowl": { calories: 60, protein: 3.5 },
      "Medium Bowl": { calories: 100, protein: 5.5 }
    }
  },
  {
    id: 123,
    name: "Mix Veg Raita",
    category: "Raitas",
    emoji: "🥣",
    portions: {
      "Small Bowl": { calories: 65, protein: 3.2 },
      "Medium Bowl": { calories: 110, protein: 5.2 }
    }
  },

  // 🥟 SOUTH INDIAN
  {
    id: 124,
    name: "Idli Sambar",
    category: "South Indian",
    emoji: "🥟",
    portions: {
      "2 Idlis + Medium Bowl Sambar": { calories: 250, protein: 8 },
      "3 Idlis + Large Bowl Sambar": { calories: 350, protein: 11 }
    }
  },
  {
    id: 125,
    name: "Masala Dosa",
    category: "South Indian",
    emoji: "🥞",
    portions: {
      "1 Dosa + Sambar & Chutney": { calories: 350, protein: 8 }
    }
  },
  {
    id: 126,
    name: "Plain Dosa",
    category: "South Indian",
    emoji: "🥞",
    portions: {
      "1 Dosa + Sambar & Chutney": { calories: 200, protein: 5 }
    }
  },
  {
    id: 127,
    name: "Vada Sambar",
    category: "South Indian",
    emoji: "🍩",
    portions: {
      "2 Vadas + Medium Bowl Sambar": { calories: 350, protein: 10 }
    }
  },
  {
    id: 128,
    name: "Uttapam",
    category: "South Indian",
    emoji: "🥞",
    portions: {
      "1 Uttapam + Sambar & Chutney": { calories: 300, protein: 7 }
    }
  },

  // 🌯 STREET FOOD & CHINESE
  {
    id: 129,
    name: "Egg Roll",
    category: "Street Food & Chinese",
    emoji: "🌯",
    portions: {
      "1 Roll": { calories: 350, protein: 12 },
      "1 Double Egg Roll": { calories: 430, protein: 18 }
    }
  },
  {
    id: 130,
    name: "Veg Roll",
    category: "Street Food & Chinese",
    emoji: "🌯",
    portions: {
      "1 Roll": { calories: 280, protein: 6 },
      "1 Paneer Roll": { calories: 400, protein: 12 }
    }
  },
  {
    id: 131,
    name: "Tandoori Soya Chaap",
    category: "Street Food & Chinese",
    emoji: "🍢",
    portions: {
      "Half Plate (4-5 pieces)": { calories: 300, protein: 25 },
      "Full Plate (8-10 pieces)": { calories: 600, protein: 50 }
    }
  },
  {
    id: 132,
    name: "Malai Soya Chaap",
    category: "Street Food & Chinese",
    emoji: "🍢",
    portions: {
      "Half Plate (4-5 pieces)": { calories: 450, protein: 22 },
      "Full Plate (8-10 pieces)": { calories: 900, protein: 44 }
    }
  },
  {
    id: 133,
    name: "Veg Steam Momos",
    category: "Street Food & Chinese",
    emoji: "🥟",
    portions: {
      "Half Plate (4-5 pieces)": { calories: 150, protein: 4 },
      "Full Plate (8-10 pieces)": { calories: 300, protein: 8 }
    }
  },
  {
    id: 134,
    name: "Veg Fried Momos",
    category: "Street Food & Chinese",
    emoji: "🥟",
    portions: {
      "Half Plate (4-5 pieces)": { calories: 250, protein: 5 },
      "Full Plate (8-10 pieces)": { calories: 500, protein: 10 }
    }
  },
  {
    id: 135,
    name: "Veg Kurkure Momos",
    category: "Street Food & Chinese",
    emoji: "🥟",
    portions: {
      "Half Plate (4-5 pieces)": { calories: 350, protein: 6 },
      "Full Plate (8-10 pieces)": { calories: 700, protein: 12 }
    }
  },
  {
    id: 136,
    name: "Paneer Steam Momos",
    category: "Street Food & Chinese",
    emoji: "🥟",
    portions: {
      "Half Plate (4-5 pieces)": { calories: 200, protein: 8 },
      "Full Plate (8-10 pieces)": { calories: 400, protein: 16 }
    }
  },
  {
    id: 137,
    name: "Paneer Fried Momos",
    category: "Street Food & Chinese",
    emoji: "🥟",
    portions: {
      "Half Plate (4-5 pieces)": { calories: 320, protein: 9 },
      "Full Plate (8-10 pieces)": { calories: 640, protein: 18 }
    }
  },
  {
    id: 138,
    name: "Paneer Kurkure Momos",
    category: "Street Food & Chinese",
    emoji: "🥟",
    portions: {
      "Half Plate (4-5 pieces)": { calories: 420, protein: 10 },
      "Full Plate (8-10 pieces)": { calories: 840, protein: 20 }
    }
  },
  {
    id: 139,
    name: "Fried Rice",
    category: "Street Food & Chinese",
    emoji: "🍚",
    portions: {
      "Half Plate": { calories: 300, protein: 6 },
      "Full Plate": { calories: 550, protein: 11 }
    }
  },
  {
    id: 140,
    name: "Veg Noodles",
    category: "Street Food & Chinese",
    emoji: "🍜",
    portions: {
      "Half Plate": { calories: 250, protein: 5 },
      "Full Plate": { calories: 450, protein: 9 }
    }
  },
  {
    id: 141,
    name: "Chilli Potato",
    category: "Street Food & Chinese",
    emoji: "🍟",
    portions: {
      "Half Plate": { calories: 350, protein: 4 },
      "Full Plate": { calories: 700, protein: 8 }
    }
  },
  {
    id: 142,
    name: "Veg Manchurian",
    category: "Street Food & Chinese",
    emoji: "🍲",
    portions: {
      "Half Plate": { calories: 250, protein: 5 },
      "Full Plate": { calories: 500, protein: 10 }
    }
  },
  {
    id: 143,
    name: "French Fries",
    category: "Street Food & Chinese",
    emoji: "🍟",
    portions: {
      "Small Fries": { calories: 220, protein: 3 },
      "Medium Fries": { calories: 340, protein: 4.5 },
      "Large Fries": { calories: 480, protein: 6 }
    }
  },
  {
    id: 144,
    name: "Samosa",
    category: "Street Food & Chinese",
    emoji: "🥟",
    portions: {
      "1 Piece": { calories: 250, protein: 4 },
      "2 Pieces": { calories: 500, protein: 8 }
    }
  },
  {
    id: 145,
    name: "Kachori",
    category: "Street Food & Chinese",
    emoji: "🧆",
    portions: {
      "1 Piece": { calories: 280, protein: 5 },
      "2 Pieces": { calories: 560, protein: 10 }
    }
  },
  {
    id: 146,
    name: "Aloo Tikki",
    category: "Street Food & Chinese",
    emoji: "🥔",
    portions: {
      "1 Plate (2 Tikkis + Chutney)": { calories: 350, protein: 5 }
    }
  },
  {
    id: 147,
    name: "Pav Bhaji",
    category: "Street Food & Chinese",
    emoji: "🍔",
    portions: {
      "1 Plate (2 Pavs + Bhaji)": { calories: 400, protein: 8 },
      "Extra Pav (1 pair)": { calories: 150, protein: 3 }
    }
  },
  {
    id: 148,
    name: "Chole Bhature",
    category: "Street Food & Chinese",
    emoji: "🫓",
    portions: {
      "1 Plate (2 Bhature + Chole)": { calories: 650, protein: 15 },
      "Single Bhatura": { calories: 200, protein: 4 }
    }
  },
  {
    id: 149,
    name: "Panipuri / Golgappa",
    category: "Street Food & Chinese",
    emoji: "🧆",
    portions: {
      "1 Plate (6 pieces)": { calories: 180, protein: 3 },
      "Family Plate (12 pieces)": { calories: 360, protein: 6 }
    }
  }
];