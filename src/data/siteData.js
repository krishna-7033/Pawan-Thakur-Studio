export const BASE_URL = 'https://pawanphotography.co.in/'
const image = (path, alt, fallback = '#dbe9ef') => ({ src: `${BASE_URL}${path}`, alt, fallback })

export const siteData = {
    brand: 'Pawan Thakur Photography',
    location: 'Shimla, Himachal Pradesh',
    hero: [
        { ...image('images/pic3.webp', 'Bride and groom sharing a quiet mountain moment'), eyebrow: 'Weddings in Focus', accent: 'Golden Frames', subline: 'Beautifully Framed' },
        { ...image('images/pic1.jpg', 'Bride in a softly lit wedding portrait'), eyebrow: 'Your Day, Forever.', accent: 'Forever Yours', subline: 'Beautifully Framed' },
        { ...image('images/pic2.jpg', 'Wedding couple walking through a celebration'), eyebrow: 'Timeless Weddings', accent: 'Love In Light', subline: 'Beautifully Framed' },
        { ...image('images/pic4.avif', 'Wedding details and joyful celebration'), eyebrow: 'Magic in Every Frame', accent: 'Pure Wonder', subline: 'Beautifully Framed' },
        { ...image('images/pic5.jpeg', 'Elegant wedding photography portrait'), eyebrow: 'Elegant Clicks', accent: 'The In-Between', subline: 'Beautifully Framed' },
        { ...image('images/pic6.jpg', 'Couple embracing outdoors in Himachal'), eyebrow: 'Emotions in HD', accent: 'True Emotion', subline: 'Beautifully Framed' },
    ],
    locations: [
        image('images/pw1.jpeg', 'Pre-wedding couple in Shimla', ' #c5dce3'),
        image('images/pw2.jpg', 'Couple portrait in Manali', '#d9d0c7'),
        image('images/pw3.jpg', 'Wedding portrait in Kasauli', '#b4cbd0'),
        image('images/pw4.jpg', 'Intimate celebration in Chail', '#e4d6ca'),
    ],
    studioImages: [
        image('images/pw5.jpg', 'Bride laughing during a pre-wedding shoot'), image('images/w1.jpg', 'Wedding ceremony under warm light'),
        image('images/w2.jpg', 'Couple dancing at their wedding'), image('images/pw6.webp', 'Couple walking through a pine forest'),
    ],
    services: [
        { title: 'Wedding Photography', description: 'Honest, artful photographs for the chapters you will revisit forever.', icon: 'heart' },
        { title: 'Portrait Photography', description: 'Thoughtful portraits that make your personality the whole story.', icon: 'aperture' },
        { title: 'Event Photography', description: 'The energy, the details, and every guest who made it matter.', icon: 'sparkles' },
        { title: 'Fashion Photography', description: 'Editorial frames with a little edge, movement, and mountain light.', icon: 'camera' },
    ],
    story: [
        { label: 'Our Story', title: 'A studio built around feeling', text: 'Pawan Thakur Photography began with a simple instinct: the photographs that last are the ones that feel like you. From Shimla to celebrations across Himachal, we make room for the unscripted glances, loud laughter, and calm between the moments.', ...image('images/pic1.jpg', 'Pawan Thakur Photography couple portrait') },
        { label: 'Our Vision', title: 'Light, layered with memory', text: 'Our vision is to create wedding imagery that feels cinematic without losing its truth. Every frame is guided by natural light, thoughtful direction, and a deep respect for the people in front of the lens.', ...image('images/pic3.webp', 'Pawan Thakur Photography wedding scene') },
    ],
    timeline: [
        { title: 'Pre-Wedding Photoshoot', text: 'A relaxed beginning: wandering, talking, and letting the landscape give your story its first beautiful setting.', ...image('images/pw1.jpeg', 'Pre-wedding photoshoot in Shimla') },
        { title: 'Engagement Photoshoot', text: 'The promise before the party. We turn the anticipation, nerves, and knowing smiles into a gallery that feels entirely yours.', ...image('images/w3.jpg', 'Engagement photoshoot in Himachal') },
        { title: 'Wedding Photoshoot', text: 'From first light to the last dance, we stay close to the feeling and attentive to everything that makes your day singular.', ...image('images/w1.jpg', 'Himachal wedding photoshoot') },
    ],
    events: [
        { title: 'Wedding Ceremony Photoshoot', text: 'A gentle, observant approach to the rituals, people, and small details that make your ceremony personal.', ...image('images/e1.jpg', 'Wedding ceremony details') },
        { title: 'Celebration Party Photoshoot', text: 'Colour, music, and the kind of joy that shows up in a room before anyone says a word.', ...image('images/e2.jpeg', 'Wedding celebration party') },
        { title: 'Dinner Stories Photoshoot', text: 'Warm tables, full hearts, and all the conversations that continue long after the photographs are made.', ...image('images/e3.webp', 'Wedding dinner table') },
        { title: 'Reception Photoshoot', text: 'An expressive visual record of the people who came to celebrate your next beginning.', ...image('images/e4.jpeg', 'Wedding reception celebration') },
    ],
    films: [image('images/clip1.mp4', 'Wedding film still one'), image('images/clip3.mp4', 'Wedding film still two'), image('images/v2.mp4', 'Wedding film still three'), image('images/clip1.mp4', 'Wedding film still four'), image('images/clip3.mp4', 'Wedding film still five'), image('images/v2.mp4', 'Wedding film still six')],
    moments: [image('images/w1.jpg', 'Couple in a wedding celebration'), image('images/w2.jpg', 'Wedding dance moment'), image('images/w3.jpg', 'Engagement celebration'), image('images/w4.jpg', 'Himachal wedding portrait'), image('images/w5.jpg', 'Wedding detail and flowers')],
    gallery: [
        ...['pw1.jpeg', 'pw2.jpg', 'pw3.jpg', 'pw4.jpg', 'pw5.jpg', 'pw6.webp', 'pw7.jpg'].map((path, index) => image(`images/${path}`, `Pre-wedding gallery image ${index + 1}`)),
        ...['w1.jpg', 'w2.jpg', 'w3.jpg', 'w4.jpg', 'w5.jpg'].map((path, index) => image(`images/${path}`, `Wedding gallery image ${index + 1}`)),
        ...['e1.jpg', 'e2.jpeg', 'e3.webp', 'e4.jpeg'].map((path, index) => image(`images/${path}`, `Event gallery image ${index + 1}`)),
        ...['out1.jpg', 'out2.jpg', 'out3.jpg', 'out4.jpg', 'out5.jpg', 'out6.jpg'].map((path, index) => image(`style/images/${path}`, `Outdoor gallery image ${index + 1}`)),
    ],
    footerImages: ['images/pw1.jpeg', 'images/pw2.jpg', 'images/w1.jpg', 'images/w2.jpg', 'images/e1.jpg', 'style/images/out1.jpg'].map((path, index) => image(path, `Instagram post ${index + 1}`)),
}
