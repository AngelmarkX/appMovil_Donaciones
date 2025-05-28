"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Bell, Calendar, Check, Package, ShoppingBag } from "lucide-react"

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Nueva donación disponible",
      message: "Restaurante Ejemplo ha publicado una nueva donación de frutas y verduras.",
      time: "Hace 30 minutos",
      read: false,
      type: "new-donation",
      link: "/dashboard/available/1",
    },
    {
      id: 2,
      title: "Solicitud aceptada",
      message: "Tu solicitud para la donación de pan y bollería ha sido aceptada.",
      time: "Hace 2 horas",
      read: false,
      type: "request-accepted",
      link: "/dashboard/donations/2",
    },
    {
      id: 3,
      title: "Recordatorio de recogida",
      message: "Recuerda recoger la donación de lácteos mañana entre 14:00 y 16:00.",
      time: "Hace 5 horas",
      read: true,
      type: "pickup-reminder",
      link: "/dashboard/donations/3",
    },
    {
      id: 4,
      title: "Donación entregada",
      message: "La donación de comida preparada ha sido marcada como entregada.",
      time: "Ayer",
      read: true,
      type: "donation-completed",
      link: "/dashboard/donations/4",
    },
  ])

  const markAsRead = (id: number) => {
    setNotifications((prev) =>
      prev.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
    )
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notification) => ({ ...notification, read: true })))
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "new-donation":
        return <Package className="w-5 h-5 text-blue-600" />
      case "request-accepted":
        return <Check className="w-5 h-5 text-green-600" />
      case "pickup-reminder":
        return <Calendar className="w-5 h-5 text-amber-600" />
      case "donation-completed":
        return <ShoppingBag className="w-5 h-5 text-emerald-600" />
      default:
        return <Bell className="w-5 h-5 text-gray-600" />
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-white px-4 md:px-6">
        <Link href="/dashboard" className="flex items-center gap-2 text-sm font-medium">
          <ArrowLeft className="h-4 w-4" />
          Volver
        </Link>
        <h1 className="text-lg font-semibold">Notificaciones</h1>
        <div className="flex-1"></div>
        <Button variant="outline" size="sm" onClick={markAllAsRead}>
          Marcar todas como leídas
        </Button>
      </header>

      <main className="flex-1 p-4 md:p-6">
        <div className="mx-auto max-w-3xl space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">
              {notifications.filter((n) => !n.read).length} notificaciones sin leer
            </p>
          </div>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Centro de Notificaciones</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 p-4">
              {notifications.length > 0 ? (
                notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`flex gap-4 p-4 border rounded-lg ${notification.read ? "bg-white" : "bg-green-50"}`}
                  >
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100">
                        {getNotificationIcon(notification.type)}
                      </div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="font-medium">{notification.title}</h3>
                            {!notification.read && <Badge className="bg-green-100 text-green-800">Nueva</Badge>}
                          </div>
                          <p className="text-gray-600 text-sm">{notification.message}</p>
                          <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                        </div>

                        <div className="flex items-center gap-2 mt-2 sm:mt-0">
                          {!notification.read && (
                            <Button variant="ghost" size="sm" onClick={() => markAsRead(notification.id)}>
                              Leída
                            </Button>
                          )}

                          <Link href={notification.link}>
                            <Button variant="outline" size="sm">
                              Ver
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center py-12">
                  <Bell className="w-12 h-12 mb-4 text-gray-300" />
                  <h3 className="text-lg font-medium">No tienes notificaciones</h3>
                  <p className="text-gray-500 text-center">Las notificaciones aparecerán aquí cuando haya actividad</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
