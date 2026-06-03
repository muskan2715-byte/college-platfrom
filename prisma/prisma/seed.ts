import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  await prisma.college.createMany({
    data: [
      {
        name: "IIT Bombay",
        location: "Mumbai, Maharashtra",
        fees: 200000,
        rating: 4.8,
        overview: "One of India's premier engineering institutes known for research and innovation.",
        courses: ["B.Tech", "M.Tech", "MBA", "PhD"],
        placements: "Average package 18 LPA, highest 1.2 CR",
        image: "https://upload.wikimedia.org/wikipedia/en/thumb/8/80/Indian_Institute_of_Technology_Bombay_Logo.svg/200px-Indian_Institute_of_Technology_Bombay_Logo.svg.png"
      },
      {
        name: "Delhi University",
        location: "New Delhi, Delhi",
        fees: 50000,
        rating: 4.2,
        overview: "Top central university offering diverse undergraduate and postgraduate programs.",
        courses: ["B.A", "B.Com", "B.Sc", "M.A", "LLB"],
        placements: "Average package 6 LPA, highest 18 LPA",
        image: ""
      },
      {
        name: "VIT Vellore",
        location: "Vellore, Tamil Nadu",
        fees: 180000,
        rating: 4.0,
        overview: "Private university with strong industry connections and good placement record.",
        courses: ["B.Tech", "M.Tech", "MBA", "MCA"],
        placements: "Average package 7 LPA, highest 44 LPA",
        image: ""
      },
      {
        name: "BITS Pilani",
        location: "Pilani, Rajasthan",
        fees: 450000,
        rating: 4.6,
        overview: "Prestigious private institute famous for its practice school program.",
        courses: ["B.E", "M.E", "MBA", "PhD"],
        placements: "Average package 15 LPA, highest 1 CR",
        image: ""
      },
      {
        name: "Manipal University",
        location: "Manipal, Karnataka",
        fees: 300000,
        rating: 3.9,
        overview: "Well-known private university with strong medical and engineering programs.",
        courses: ["MBBS", "B.Tech", "BBA", "B.Pharm"],
        placements: "Average package 6 LPA, highest 22 LPA",
        image: ""
      },
    ]
  })
  console.log('✅ Seed data added!')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())