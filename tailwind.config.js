/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin');

export default {
	darkMode: ['class'],
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		'./node_modules/flowbite-svelte-icons/**/*.{html,js,svelte,ts}'
	],

	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
        nightSky: {
          100: '#201c2f',
          200: '#100751',
        },
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: 0 },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: 0 }
				},
				// animStar: {
        //   from: { transform: 'translateY(0px)' },
        //   to: { transform: 'translateY(-2560px) translateX(-2560px)' },
        // },
        // animShootingStar: {
        //   from: { transform: 'translateY(0px) translateX(0px) rotate(-45deg)', opacity: '1', height: '5px' },
        //   to: { transform: 'translateY(-2560px) translateX(-2560px) rotate(-45deg)', opacity: '1', height: '800px' },
        // },
        animStar: {
          '0%': { transform: 'translate(0, 0)' },
          '100%': { transform: 'translate(-500px, 500px)' },
        },
        animShootingStar: {
          '0%': {
            transform: 'translate(0, 0) rotate(-45deg)',
            opacity: '1',
            height: '5px',
          },
          '100%': {
            transform: 'translate(1000px, -1000px) rotate(-45deg)',
            opacity: '0',
            height: '100px',
          },
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				animStar: 'animStar 100s linear infinite',
        animStar2: 'animStar 125s linear infinite',
        animStar3: 'animStar 175s linear infinite',
        animShootingStar: 'animShootingStar 10s linear infinite',
			}
		}
	},

	plugins: [
		require('tailwindcss-animate'),
		plugin(function({ addUtilities }) {
      addUtilities({
        '.star-template': {
          zIndex: '10',
          width: '1px',
          height: '1px',
          borderRadius: '50%',
          background: 'transparent',
          position: 'relative',
          '&::after': {
            content: '""',
            top: '-600px',
            width: '1px',
            height: '1px',
            borderRadius: '50%',
            position: 'absolute',
            background: 'transparent',
          },
        },
        '.shooting-star-template': {
          zIndex: '10',
          width: '5px',
          height: '85px',
          borderTopLeftRadius: '50%',
          borderTopRightRadius: '50%',
          position: 'absolute',
          bottom: '0',
          right: '0',
          background:
            'linear-gradient(to top, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1))',
        },
      });
    }),

	]
};
