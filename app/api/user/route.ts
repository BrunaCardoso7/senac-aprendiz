import { NextRequest, NextResponse } from 'next/server'
import { userSchema } from '@/server/schema/user-schema'
import { prisma } from '@/prisma/seed'
import bcrypt from 'bcryptjs'



export async function GET(req: NextRequest) {
  try {
    const matricula = req.nextUrl.searchParams.get('matricula')

    if (matricula) {
      const user = await prisma.user.findUnique({
        where: { matricula },
      })

      if (!user) {
        return NextResponse.json(
          {
            message: 'Usuário não encontrado',
            user: null,
          },
          {
            status: 404,
          }
        )
      }

      return NextResponse.json(user)
    }

    const users = await prisma.user.findMany()

    return NextResponse.json(users)
  } catch (error) {
    console.error(error)

    return NextResponse.json(
      {
        message: 'Erro interno do servidor',
      },
      {
        status: 500,
      }
    )
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    const parsed = userSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ detail: parsed.error.flatten() }, { status: 400 })
    }

    // ✅ Aqui o TypeScript já sabe que parsed.success === true
    const { name, matricula, password } = parsed.data


    const existingUser = await prisma.user.findUnique({
      where: {
        matricula: parsed.data.matricula,
      },
    })

    if (existingUser) {
      return NextResponse.json(
        {
          message: 'Já existe um usuário com esta matrícula',
        },
        {
          status: 409,
        }
      )
    }
    const hashedPassword = await bcrypt.hash(parsed.data.password, 10)
    
    const user = await prisma.user.create({
      data: {
        name: parsed.data.name,
        matricula: parsed.data.matricula,
        password: hashedPassword,
      },
    })

    return NextResponse.json(
      {
        message: 'Usuário criado com sucesso',
        data: user,
      },
      {
        status: 201,
      }
    )
  } catch (error) {
    console.error(error)

    return NextResponse.json(
      {
        message: 'Erro interno do servidor',
      },
      {
        status: 500,
      }
    )
  }
}