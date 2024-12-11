import indicate_img from './indicate_img.png'
import header_img from './Header_img.png'
import group_profiles from './group_profiles.png'
import profile_pic from './profile_pic.jpg'
import contect_us from './contect-us.jpeg'
import about_image from './about.jpg'
import logo from './logo.png'
import dropdown_icon from './dropdown_icon.svg'
import menu_icon from './menu_icon.svg'
import cross_icon from './cross_icon.png'
import chats_icon from './chats_icon.svg'
import verified_icon from './verified_icon.svg'
import arrow_icon from './arrow_icon.svg'
import info_icon from './info_icon.svg'
import upload_icon from './upload_icon.png'
import stripe_logo from './stripe_logo.png'
import razorpay_logo from './razorpay_logo.png'

import img1 from './img1.png'
import img2 from './img2.png'
import img3 from './img3.jpg'
import img4 from './img4.jpg'
import img5 from './img5.jpg'
import img6 from './img6.png'
import img7 from './img7.png'
import img8 from './img8.png'
import img9 from './img9.png'
import img10 from './img10.png'
import img11 from './img11.png'
import img12 from './img12.png'
import img13 from './img13.png'
import img14 from './img14.png'
import img15 from './img15.png'

import electrician from './electrician.png'
import plumber from './plumber.png'
import carpenter from './carpenter.png'
import painter from './painter.png'
import barber from './barber.png'
import cleaner from './cleaner.png'
import innovation_icon from './innovation_icon.png'
import quality_icon from './quality_icon.png'
import support_icon from './support_icon.png'
import vision_icon from './vision_icon.png'
import mission_icon from './mission_icon.png'


export const assets = {
    indicate_img,
    header_img,
    group_profiles,
    logo,
    chats_icon,
    verified_icon,
    info_icon,
    profile_pic,
    arrow_icon,
    contect_us,
    about_image,
    menu_icon,
    cross_icon,
    dropdown_icon,
    upload_icon,
    stripe_logo,
    razorpay_logo,
    innovation_icon,
    support_icon,
    quality_icon,
    mission_icon,
    vision_icon
}


export const services_data = [
    {
        service: 'Electrician',
        image: electrician
    },
    {
        service: 'Plumber',
        image: plumber
    },
    {
        service: 'Carpenter',
        image: carpenter
    },
    {
        service: 'Painter',
        image: painter
    },
    {
        service: 'Barber',
        image: barber
    },
    {
        service: 'Cleaner',
        image: cleaner
    },
]


export const workers = [
    {
        _id: 'img1',
        name: 'John Harris',
        image: img1,
        service: 'Electrician',
        available:true,
        experience: '5 Years',
        about: 'John is a certified electrician who specializes in home electrical repairs and installations. He is known for his punctuality and attention to detail.',
        fees: 40,
        address: {
            line1: '12th Street, Green Valley',
            line2: 'Apartment 102, City Centre'
        }
    },
    {
        _id: 'img2',
        name: 'Robert Clark',
        image: img2,
        service: 'Plumber',
        available:true,
        experience: '3 Years',
        about: 'Robert is a skilled plumber with expertise in fixing leaks, pipe installations, and drain cleaning. He values providing quick and affordable services.',
        fees: 35,
        address: {
            line1: '16th Avenue, Lake View',
            line2: 'Near Waterworks, Hill Town'
        }
    },
    {
        _id: 'img3',
        name: 'David Smith',
        image: img3,
        service: 'Carpenter',
        available:true,
        experience: '8 Years',
        about: 'David is a master carpenter who crafts custom furniture and handles all kinds of woodwork with precision and creativity.',
        fees: 50,
        address: {
            line1: 'Oak Street, Woodland Park',
            line2: 'Suite 201, Maple Plaza'
        }
    },
    {
        _id: 'img4',
        name: 'Emma Johnson',
        image: img4,
        service: 'Painter',
        available:true,
        experience: '6 Years',
        about: 'Emma is a professional painter who specializes in both interior and exterior wall painting, known for her vibrant color choices and clean finishes.',
        fees: 45,
        address: {
            line1: '22nd Block, River Heights',
            line2: 'Top Floor, Color Lane'
        }
    },
    {
        _id: 'img5',
        name: 'Liam Carter',
        image: img5,
        service: 'Barber',
        available:true,
        experience: '4 Years',
        about: 'Liam is a friendly barber who keeps up with the latest trends and ensures every customer leaves with a fresh, stylish look.',
        fees: 20,
        address: {
            line1: 'Main Road, Heritage Square',
            line2: 'Shop 5, Downtown Market'
        }
    },
    {
        _id: 'img6',
        name: 'Sophia Brown',
        image: img6,
        service: 'Cleaner',
        available:true,
        experience: '2 Years',
        about: 'Sophia is a reliable cleaner who specializes in deep cleaning and organizing homes and offices to make them spotless.',
        fees: 30,
        address: {
            line1: '14th Cross, Green Meadows',
            line2: 'Behind Park Lane, City Edge'
        }
    },
    {
        _id: 'img7',
        name: 'James Wilson',
        image: img7,
        service: 'Electrician',
        available:true,
        experience: '7 Years',
        about: 'James is highly experienced in electrical troubleshooting and smart home device installations. He ensures safety and quality in every task.',
        fees: 50,
        address: {
            line1: '7th Lane, Sunset Boulevard',
            line2: 'Near Electric Plaza, Downtown'
        }
    },
    {
        _id: 'img8',
        name: 'Olivia Taylor',
        image: img8,
        service: 'Plumber',
        available:true,
        experience: '5 Years',
        about: 'Olivia is a plumber who excels in fixing complex plumbing systems. She is quick, efficient, and ensures a long-term solution for every issue.',
        fees: 40,
        address: {
            line1: 'Maple Lane, Sunrise Residency',
            line2: 'Apartment 303, Hill View'
        }
    },
    {
        _id: 'img9',
        name: 'Ethan Anderson',
        image: img9,
        service: 'Carpenter',
        available:true,
        experience: '10 Years',
        about: 'Ethan has been working as a carpenter for over a decade, creating stunning wooden masterpieces and offering exceptional service.',
        fees: 60,
        address: {
            line1: 'Elmwood Drive, Craft Park',
            line2: 'Suite 12, Artisan Building'
        }
    },
    {
        _id: 'img10',
        name: 'Ava Moore',
        image: img10,
        service: 'Painter',
        available:true,
        experience: '3 Years',
        about: 'Ava specializes in home renovations, providing affordable yet premium painting services to enhance your living space.',
        fees: 35,
        address: {
            line1: 'Cedar Road, Bloom Valley',
            line2: 'Villa 5, Artistic Colony'
        }
    },
    {
        _id: 'img11',
        name: 'William Lee',
        image: img11,
        service: 'Barber',
        available:true,
        experience: '6 Years',
        about: 'William is a seasoned barber with a passion for giving sharp, professional cuts. His friendly attitude makes every haircut enjoyable.',
        fees: 25,
        address: {
            line1: 'High Street, Urban Centre',
            line2: 'Next to Coffee House, Midtown'
        }
    },
    {
        _id: 'img12',
        name: 'Charlotte Adams',
        image: img12,
        service: 'Cleaner',
        available:true,
        experience: '4 Years',
        about: 'Charlotte provides top-notch cleaning services for homes and offices, with an eye for detail and a commitment to customer satisfaction.',
        fees: 35,
        address: {
            line1: 'Willow Court, Country Estate',
            line2: 'Ground Floor, Sunview Apartments'
        }
    },
    {
        _id: 'img13',
        name: 'Benjamin King',
        image: img13,
        service: 'Electrician',
        available:true,
        experience: '6 Years',
        about: 'Benjamin has a deep knowledge of electrical systems and offers fast, affordable services for all your electrical needs.',
        fees: 45,
        address: {
            line1: 'Birch Street, Electric Avenue',
            line2: 'Near City Hall, Metro Square'
        }
    },
    {
        _id: 'img14',
        name: 'Isabella Green',
        image: img14,
        service: 'Plumber',
        available:true,
        experience: '2 Years',
        about: 'Isabella is a young and energetic plumber who ensures quick fixes and thorough service for every plumbing challenge.',
        fees: 30,
        address: {
            line1: 'Rosewood Avenue, Flower Park',
            line2: 'Apartment 24, Garden City'
        }
    },
    {
        _id: 'img15',
        name: 'Noah Scott',
        image: img15,
        service: 'Carpenter',
        available:true,
        experience: '12 Years',
        about: 'Noah is a veteran carpenter whose expertise lies in creating sturdy, beautiful, and functional wood designs for homes and offices.',
        fees: 70,
        address: {
            line1: 'Pine Drive, Woodland Estate',
            line2: 'Workshop 8, Timber Plaza'
        }
    }
];


