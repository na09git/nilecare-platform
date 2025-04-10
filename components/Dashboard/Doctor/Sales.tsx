'use client'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getInitials } from "@/utils/generateInitials";
import { getNormalDate } from "@/utils/getNormalDate";
import { Sale } from "@prisma/client";
import Link from "next/link";




export default function Sales({
    data,
    title,
    role }:
    {
        data: Sale[],
        title: string
        role: string
    }) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent className="grid  gap-8">
                {data.map((item, i) => {
                    const initials = getInitials(item.patientName);
                    return (
                        <>
                            {role === 'DOCTOR' ?
                                (<Link href={`/dashboard/doctor/appointments/view/${item.appointmentId}`}
                                    className="flex items-center gap-4" >
                                    <Avatar>
                                        <AvatarImage src="/avatar/01.png" alt="Avatar image" />
                                        <AvatarFallback>{initials}</AvatarFallback>
                                    </Avatar >
                                    <div className="grid  gap-1">
                                        <p className="text-sm font-medium text-slate-800 dark:text-slate-200">
                                            {item.patientName}
                                        </p>
                                        <div className="text-sm text-slate-500 dark:text-slate-400">
                                            Birr - {item.totalAmount.toLocaleString()}
                                        </div>
                                        <div className="text-sm text-slate-500 dark:text-slate-400">
                                            {getNormalDate(item.createdAt.toISOString())}
                                        </div>
                                    </div>
                                </Link>
                                ) :
                                (<div className="flex items-center gap-4" >
                                    <Avatar>
                                        <AvatarImage src="/avatar/01.png" alt="Avatar image" />
                                        <AvatarFallback>{initials}</AvatarFallback>
                                    </Avatar >
                                    <div className="grid  gap-1">
                                        <p className="text-sm font-medium text-slate-800 dark:text-slate-200">
                                            {item.patientName}
                                        </p>
                                        <div className="text-sm text-slate-500 dark:text-slate-400">
                                            Birr - {item.totalAmount.toLocaleString()}
                                        </div>
                                        <div className="text-sm text-slate-500 dark:text-slate-400">
                                            {getNormalDate(item.createdAt.toISOString())}
                                        </div>
                                    </div>
                                </div>)
                            }
                        </>
                    )
                })}
            </CardContent>
        </Card>
    )
}
