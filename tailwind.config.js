/** @type {import('tailwindcss').Config} */


module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        screens: {
            'sm': "360px",
            'md': "768px",
            'lg': "1024px",
            'xl': "1336px",
            '2xl': "1512px",
            '3xl': "1920px",
        },

        fontFamily: {
            comfortaa: ['Comfortaa', 'cursive'],
            serif: ["Merriweather", "serif"],
        },
        extend: {
            spacing: {
                128: "32rem",
                144: "36rem",
            },
            borderRadius: {
                "4xl": "2rem",
            },
            colors: {
                // 'text-color': 'rgb(97, 218, 251)',
                // 'bg-color': 'rgb(41, 44, 51)',
                'text-color': 'rgb(234, 226, 183)',
                'bg-color': 'rgb(0, 48, 73)',
                'third-color': 'rgb(247, 127, 0)',
                'four-color': 'rgb(214, 40, 40)'

            },
        },
    },
    plugins: [],
};

