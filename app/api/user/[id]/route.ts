// import 'reflect-metadata'
// import { NextRequest, NextResponse } from 'next/server'
// import { prisma } from '@/prisma/seed'

// type Params = {
//   params: Promise<{
//     id: string
//   }>
// }

// export async function GET(_: NextRequest, { params }: Params) {
//   const { id } = await params
//   const user = await prisma.user.findUnique({
//     where: { id: Number(id) },
//   })

//   if (!user) {
//     return NextResponse.json(
//       { message: 'Usuário não encontrado' },
//       { status: 404 }
//     )
//   }

//   return NextResponse.json(user)
// }

// export async function DELETE(_: NextRequest, { params }: Params) {
//   const { id } = await params
//   await prisma.user.delete({
//     where: { id: Number(id) },
//   })

//   return NextResponse.json({
//     message: 'Usuário deletado com sucesso',
//   })
// }

// export async function PUT(req: NextRequest, { params }: Params) {
//   const { id } = await params
//   const body = await req.json()

//   const user = await prisma.user.findUnique({
//     where: { id: Number(id) },
//   })

//   if (!user) {
//     return NextResponse.json(
//       { message: 'Usuário não encontrado' },
//       { status: 404 }
//     )
//   }

//   const updated = await prisma.user.update({
//     where: { id: Number(id) },
//     data: {
//       name: body.name,
//       matricula: body.matricula,
//       password: body.password,
//     },
//   })
  
//   return NextResponse.json({
//     message: 'Usuário atualizado com sucesso',
//     data: updated,
//   })
// }