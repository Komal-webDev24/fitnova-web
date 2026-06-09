import React, { useState } from "react";

const DietPlanDashboard = () => {
  const [selectedDay, setSelectedDay] = useState(0);

  const dietPlan = [
    {
      day: "Monday",
      meals: {
        breakfast: {
          dish: "Vegetable Oats Porridge with Almonds",
          ingredients: [
            "1 cup rolled oats",
            "1 cup skimmed milk",
            "1/2 cup mixed vegetables",
            "2 chopped almonds",
            "Salt, pepper, 1 tsp ghee",
          ],
          protein: "Oats, Milk, Almonds",
          calories: 320,
        },
        lunch: {
          dish: "Paneer Bhurji with 2 Multigrain Roti + Cucumber Salad",
          ingredients: [
            "100g paneer (crumbled)",
            "2 multigrain rotis",
            "1/2 cup mixed vegetables",
            "1 cup cucumber-tomato salad",
            "Spices: turmeric, garam masala",
          ],
          protein: "Paneer",
          calories: 480,
        },
        eveningSnack: {
          dish: "Sprouted Moong Chaat",
          ingredients: [
            "1 cup sprouted moong",
            "1/2 cup chopped onions",
            "1 tomato",
            "1 tsp lemon juice",
            "Coriander, chaat masala",
          ],
          protein: "Sprouted Moong",
          calories: 180,
        },
        dinner: {
          dish: "Chicken Curry (150g) + 2 Roti + Mixed Veg Sabzi",
          ingredients: [
            "150g chicken boneless",
            "2 multigrain rotis",
            "1/2 cup mixed vegetable sabzi",
            "Onion-tomato gravy",
            "Spices",
          ],
          protein: "Chicken",
          calories: 520,
        },
      },
    },
    {
      day: "Tuesday",
      meals: {
        breakfast: {
          dish: "Moong Dal Chilla with Mint Chutney",
          ingredients: [
            "1 cup moong dal batter",
            "1/2 cup grated carrots",
            "1/4 cup spinach",
            "Green chilies, ginger",
            "Mint chutney, 1 tsp oil",
          ],
          protein: "Moong Dal",
          calories: 310,
        },
        lunch: {
          dish: "Rajma Curry + 2 Roti + Rice (1/2 cup) + Pickle",
          ingredients: [
            "1 cup rajma",
            "2 multigrain rotis",
            "1/2 cup cooked rice",
            "1 tsp pickle",
            "Onion salad",
          ],
          protein: "Rajma",
          calories: 510,
        },
        eveningSnack: {
          dish: "Boiled Eggs (2) + 1 Apple",
          ingredients: ["2 boiled eggs", "1 medium apple"],
          protein: "Eggs",
          calories: 220,
        },
        dinner: {
          dish: "Tofu Stir-fry with Vegetables + Quinoa",
          ingredients: [
            "100g tofu cubed",
            "1 cup mixed vegetables",
            "1/2 cup cooked quinoa",
            "1 tsp soy sauce",
            "Garlic, ginger",
          ],
          protein: "Tofu",
          calories: 420,
        },
      },
    },
    {
      day: "Wednesday",
      meals: {
        breakfast: {
          dish: "Poha with Peanuts + 1 Glass Milk",
          ingredients: [
            "1.5 cups flattened rice",
            "30g peanuts",
            "1/2 cup peas",
            "Turmeric, mustard seeds",
            "1 cup skimmed milk",
          ],
          protein: "Peanuts, Milk",
          calories: 340,
        },
        lunch: {
          dish: "Chicken Tikka (150g) + Cucumber Raita + 2 Roti",
          ingredients: [
            "150g chicken tikka grilled",
            "1 cup cucumber raita",
            "2 multigrain rotis",
            "Mixed salad",
          ],
          protein: "Chicken",
          calories: 490,
        },
        eveningSnack: {
          dish: "Roasted Chickpeas (Chana)",
          ingredients: [
            "1 cup roasted chickpeas",
            "1 tsp lemon juice",
            "Chaat masala",
            "Chopped onions",
          ],
          protein: "Chickpeas",
          calories: 190,
        },
        dinner: {
          dish: "Paneer Butter Masala (100g) + 2 Roti + Salad",
          ingredients: [
            "100g paneer",
            "Tomato-cream gravy",
            "2 multigrain rotis",
            "Mixed salad",
            "1 tsp butter",
          ],
          protein: "Paneer",
          calories: 500,
        },
      },
    },
    {
      day: "Thursday",
      meals: {
        breakfast: {
          dish: "Greek Yogurt Bowl with Berries and Granola",
          ingredients: [
            "1 cup Greek yogurt",
            "1/4 cup granola",
            "1/2 cup mixed berries",
            "1 tsp honey",
            "5 almonds",
          ],
          protein: "Greek Yogurt",
          calories: 300,
        },
        lunch: {
          dish: "Masoor Dal (1 cup) + 2 Roti + Rice + Mixed Sabzi",
          ingredients: [
            "1 cup masoor dal",
            "2 multigrain rotis",
            "1/2 cup rice",
            "1/2 cup mixed veg sabzi",
            "1 tsp ghee",
          ],
          protein: "Masoor Dal",
          calories: 495,
        },
        eveningSnack: {
          dish: "Grilled Tofu Cubes with Soy Sauce",
          ingredients: ["80g tofu", "1 tsp soy sauce", "Black pepper", "Chili flakes"],
          protein: "Tofu",
          calories: 150,
        },
        dinner: {
          dish: "Fish Curry (150g) + 2 Roti + Salad",
          ingredients: [
            "150g fish boneless",
            "Coconut-based curry",
            "2 multigrain rotis",
            "Mixed salad",
            "Turmeric, chili",
          ],
          protein: "Fish",
          calories: 480,
        },
      },
    },
    {
      day: "Friday",
      meals: {
        breakfast: {
          dish: "Idli (3 pieces) + Sambar + Coconut Chutney",
          ingredients: ["3 idlis steamed", "1 cup sambar", "2 tbsp coconut chutney", "Coriander leaves"],
          protein: "Idli (lentils), Sambar",
          calories: 320,
        },
        lunch: {
          dish: "Egg Curry (2 eggs) + 2 Roti + Rice",
          ingredients: [
            "2 boiled eggs in gravy",
            "2 multigrain rotis",
            "1/2 cup rice",
            "Pickles",
            "Onion salad",
          ],
          protein: "Eggs",
          calories: 505,
        },
        eveningSnack: {
          dish: "Mixed Nuts (30g) + Green Tea",
          ingredients: ["30g mixed nuts", "1 cup green tea no sugar"],
          protein: "Nuts",
          calories: 180,
        },
        dinner: {
          dish: "Vegetable Khichdi with Paneer (100g)",
          ingredients: ["1.5 cups khichdi", "100g paneer cubes", "1 tsp ghee", "Turmeric, cumin"],
          protein: "Paneer, Moong Dal",
          calories: 460,
        },
      },
    },
    {
      day: "Saturday",
      meals: {
        breakfast: {
          dish: "Whole Wheat Pancake with Peanut Butter + Banana",
          ingredients: [
            "2 whole wheat pancakes",
            "2 tbsp peanut butter",
            "1 banana sliced",
            "1 tsp honey",
            "Cinnamon",
          ],
          protein: "Peanut Butter",
          calories: 350,
        },
        lunch: {
          dish: "Chana Masala (1 cup) + 2 Roti + Onion Salad",
          ingredients: [
            "1 cup chana masala",
            "2 multigrain rotis",
            "Onion-tomato salad",
            "1 tsp oil",
            "Garam masala, amchur",
          ],
          protein: "Chickpeas",
          calories: 490,
        },
        eveningSnack: {
          dish: "Curd (1 cup) with Flaxseeds",
          ingredients: ["1 cup low-fat curd", "1 tbsp ground flaxseeds", "1/2 tsp honey"],
          protein: "Curd",
          calories: 160,
        },
        dinner: {
          dish: "Chicken Breast Grilled (150g) + Steamed Vegetables",
          ingredients: [
            "150g chicken breast",
            "1 cup steamed vegetables",
            "1 tsp olive oil",
            "Lemon juice",
            "Black pepper",
          ],
          protein: "Chicken",
          calories: 430,
        },
      },
    },
    {
      day: "Sunday",
      meals: {
        breakfast: {
          dish: "Dosa (2 pieces) + Sambar + Chutney",
          ingredients: ["2 dosas", "1 cup sambar", "2 tbsp coconut chutney", "Coriander leaves"],
          protein: "Lentils in dosa, Sambar",
          calories: 330,
        },
        lunch: {
          dish: "Palak Paneer (100g) + 2 Roti + Rice + Salad",
          ingredients: [
            "100g paneer in spinach",
            "2 multigrain rotis",
            "1/2 cup rice",
            "Mixed salad",
            "1 tsp cream",
          ],
          protein: "Paneer",
          calories: 515,
        },
        eveningSnack: {
          dish: "Fruit Salad with Yogurt",
          ingredients: ["1 cup mixed fruits", "1/2 cup yogurt", "1 tsp honey", "Chopped walnuts"],
          protein: "Yogurt",
          calories: 170,
        },
        dinner: {
          dish: "Mixed Dal Tadka (1 cup) + 2 Roti + Cucumber Raita",
          ingredients: [
            "1 cup mixed dal tadka",
            "2 multigrain rotis",
            "1 cup cucumber raita",
            "1 tsp ghee",
            "Cumin, coriander",
          ],
          protein: "Mixed Dal",
          calories: 475,
        },
      },
    },
  ];

  const styles = {
    container: {
      minHeight: "100vh",
      background: "linear-gradient(135deg, #0b0b0b 0%, #1a0a0a 45%, #0b0b0b 100%)",
      color: "#fff",
      padding: "32px 18px",
      fontFamily: "Inter, Segoe UI, Arial, sans-serif",
    },
    wrapper: {
      maxWidth: "1400px",
      margin: "0 auto",
    },
    header: {
      textAlign: "center",
      marginBottom: "28px",
    },
    title: {
      fontSize: "clamp(2rem, 4vw, 3.5rem)",
      fontWeight: 800,
      letterSpacing: "1.5px",
      margin: 0,
      color: "#eee3e5",
      textShadow: "0 0 20px rgba(209, 28, 60, 0.55)",
    },
    subtitle: {
      marginTop: "10px",
      color: "#d7d7d7",
      fontSize: "1rem",
    },
    dayNav: {
      display: "flex",
      gap: "10px",
      flexWrap: "wrap",
      justifyContent: "center",
      marginBottom: "24px",
    },
    dayBtn: {
      border: "1px solid rgba(209, 28, 60, 0.5)",
      background: "rgba(209, 28, 60, 0.08)",
      color: "#fff",
      padding: "12px 16px",
      borderRadius: "14px",
      cursor: "pointer",
      transition: "all 0.25s ease",
      boxShadow: "0 0 18px rgba(209, 28, 60, 0.18)",
    },
    dayBtnActive: {
      background: "linear-gradient(135deg, #d11c3c 0%, #7f1024 100%)",
      boxShadow: "0 0 26px rgba(209, 28, 60, 0.6)",
      transform: "translateY(-1px)",
    },
    summary: {
      textAlign: "center",
      marginBottom: "22px",
      color: "#ff8aa0",
      fontWeight: 700,
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
      gap: "18px",
    },
    card: {
      position: "relative",
      overflow: "hidden",
      borderRadius: "20px",
      padding: "22px",
      background: "rgba(18, 18, 18, 0.8)",
      border: "1px solid rgba(209, 28, 60, 0.22)",
      boxShadow: "0 0 30px rgba(209, 28, 60, 0.12), inset 0 0 24px rgba(209, 28, 60, 0.06)",
      backdropFilter: "blur(14px)",
    },
    cardGlow: {
      position: "absolute",
      inset: 0,
      background: "radial-gradient(circle at top left, rgba(209, 28, 60, 0.15), transparent 45%)",
      pointerEvents: "none",
    },
    mealLabel: {
      color: "#ecdfe1",
      fontWeight: 800,
      textTransform: "uppercase",
      letterSpacing: "1.5px",
      fontSize: "0.82rem",
      marginBottom: "12px",
    },
    dish: {
      fontSize: "1.25rem",
      fontWeight: 700,
      lineHeight: 1.35,
      marginBottom: "14px",
      color: "#fff",
    },
    list: {
      margin: 0,
      paddingLeft: "18px",
      color: "#e5e5e5",
      lineHeight: 1.6,
      fontSize: "0.95rem",
    },
    footerRow: {
      display: "flex",
      gap: "12px",
      marginTop: "16px",
      flexWrap: "wrap",
    },
    pill: {
      flex: "1 1 120px",
      background: "rgba(255,255,255,0.04)",
      border: "1px solid rgba(255,255,255,0.08)",
      borderRadius: "14px",
      padding: "10px 12px",
    },
    pillLabel: {
      fontSize: "0.72rem",
      color: "#bcbcbc",
      textTransform: "uppercase",
      letterSpacing: "1px",
      marginBottom: "4px",
    },
    pillValue: {
      fontSize: "0.96rem",
      fontWeight: 700,
      color: "#ff8aa0",
    },
  };

  const mealTypes = [
    { key: "breakfast", label: "Breakfast" },
    { key: "lunch", label: "Lunch" },
    { key: "eveningSnack", label: "Evening Snack" },
    { key: "dinner", label: "Dinner" },
  ];

  const selected = dietPlan[selectedDay];
  const totalCalories =
    selected.meals.breakfast.calories +
    selected.meals.lunch.calories +
    selected.meals.eveningSnack.calories +
    selected.meals.dinner.calories;

  return (
    <div style={styles.container}>
      <div style={styles.wrapper}>
        <header style={styles.header}>
          <h1 style={styles.title}>FITNOVA DIET PLAN</h1>
          <p style={styles.subtitle}>Premium 7-Day Indian Meal Program</p>
        </header>

        <div style={styles.dayNav}>
          {dietPlan.map((day, index) => (
            <button
              key={day.day}
              type="button"
              onClick={() => setSelectedDay(index)}
              style={{
                ...styles.dayBtn,
                ...(selectedDay === index ? styles.dayBtnActive : {}),
              }}
            >
              {day.day}
            </button>
          ))}
        </div>

        <div style={styles.summary}>Total Daily Calories: {totalCalories} kcal</div>

        <div style={styles.grid}>
          {mealTypes.map((mealType) => {
            const meal = selected.meals[mealType.key];
            return (
              <div key={mealType.key} style={styles.card}>
                <div style={styles.cardGlow} />
                <div style={styles.mealLabel}>{mealType.label}</div>
                <div style={styles.dish}>{meal.dish}</div>
                <ul style={styles.list}>
                  {meal.ingredients.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <div style={styles.footerRow}>
                  <div style={styles.pill}>
                    <div style={styles.pillLabel}>Protein Source</div>
                    <div style={styles.pillValue}>{meal.protein}</div>
                  </div>
                  <div style={styles.pill}>
                    <div style={styles.pillLabel}>Calories</div>
                    <div style={styles.pillValue}>{meal.calories} kcal</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DietPlanDashboard; 