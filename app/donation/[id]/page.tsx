"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Apple, ArrowLeft, Calendar, Clock, Download, MapPin, Package, Phone, ShoppingBag, User } from "lucide-react"

export default function DonationDetailPage({ params }: { params: { id: string } }) {
  const [status, setStatus] = useState("Publicado")

  // Datos de ejemplo para la donación
  const donation = {
    id: params.id,
    title: "Frutas y verduras frescas",
    description:
      "Excedente de frutas y verduras de la semana. Incluye manzanas, plátanos, lechugas, tomates y zanahorias.",
    quantity: "15kg aproximadamente",
    expiry: "21 de Mayo, 2025",
    created: "18 de Mayo, 2025",
    status: status,
    business: {
      name: "Supermercado XYZ",
      address: "Calle Principal 123, Ciudad",
      phone: "+34 612 345 678",
      contact: "Juan Pérez",
    },
    pickupTimes: ["Lunes a Viernes: 14:00 - 16:00", "Sábados: 10:00 - 12:00"],
    activity: [
      {
        date: "18 de Mayo, 2025 - 09:30",
        action: "Donación publicada",
        user: "Supermercado XYZ",
      },
      {
        date: "18 de Mayo, 2025 - 10:15",
        action: "Donación vista por Organización Benéfica ABC",
        user: "Sistema",
      },
    ],
  }

  const handleRequestDonation = () => {
    setStatus("Solicitado")
    // Aquí iría la lógica para solicitar la donación
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <div className="container flex items-center justify-between h-16 px-4 mx-auto">
          <div className="flex items-center gap-2">
            <Apple className="w-6 h-6 text-green-600" />
            <span className="text-xl font-bold">FoodShare</span>
          </div>
        </div>
      </header>

      <main className="flex-1 py-8">
        <div className="container px-4 mx-auto">
          <div className="flex flex-col gap-8">
            {/* Back button and title */}
            <div>
              <Link href="/dashboard" className="flex items-center mb-4 text-green-600 hover:text-green-700">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Volver al dashboard
              </Link>

              <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                <div>
                  <div className="flex items-center gap-2">
                    <h1 className="text-2xl font-bold">{donation.title}</h1>
                    <Badge
                      className={
                        donation.status === "Publicado"
                          ? "bg-blue-100 text-blue-800"
                          : donation.status === "Solicitado"
                            ? "bg-amber-100 text-amber-800"
                            : donation.status === "En Proceso"
                              ? "bg-purple-100 text-purple-800"
                              : "bg-green-100 text-green-800"
                      }
                    >
                      {donation.status}
                    </Badge>
                  </div>
                  <p className="text-gray-600">ID: {donation.id}</p>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Informe
                  </Button>

                  {donation.status === "Publicado" && (
                    <Button className="bg-green-600 hover:bg-green-700" onClick={handleRequestDonation}>
                      Solicitar Donación
                    </Button>
                  )}
                </div>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {/* Donation Details */}
              <div className="md:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Detalles de la Donación</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h3 className="mb-2 text-sm font-medium text-gray-500">Descripción</h3>
                      <p>{donation.description}</p>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <h3 className="mb-2 text-sm font-medium text-gray-500">Cantidad</h3>
                        <div className="flex items-center gap-2">
                          <Package className="w-4 h-4 text-gray-400" />
                          <span>{donation.quantity}</span>
                        </div>
                      </div>

                      <div>
                        <h3 className="mb-2 text-sm font-medium text-gray-500">Fecha de Caducidad</h3>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          <span>{donation.expiry}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="mb-2 text-sm font-medium text-gray-500">Horarios de Recogida</h3>
                      <div className="space-y-1">
                        {donation.pickupTimes.map((time, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-gray-400" />
                            <span>{time}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="mb-2 text-sm font-medium text-gray-500">Fecha de Publicación</h3>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span>{donation.created}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Tabs defaultValue="activity" className="mt-6">
                  <TabsList>
                    <TabsTrigger value="activity">Actividad</TabsTrigger>
                    <TabsTrigger value="documents">Documentos</TabsTrigger>
                  </TabsList>

                  <TabsContent value="activity" className="pt-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>Historial de Actividad</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {donation.activity.map((item, index) => (
                            <div key={index} className="flex gap-4">
                              <div className="flex-shrink-0 w-1 h-full bg-gray-200 rounded"></div>
                              <div>
                                <p className="text-sm text-gray-500">{item.date}</p>
                                <p className="font-medium">{item.action}</p>
                                <p className="text-sm text-gray-600">Por: {item.user}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="documents" className="pt-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>Documentos</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-500">No hay documentos disponibles para esta donación.</p>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>

              {/* Business Info */}
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>Información del Comercio</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h3 className="mb-2 text-sm font-medium text-gray-500">Nombre</h3>
                      <div className="flex items-center gap-2">
                        <ShoppingBag className="w-4 h-4 text-gray-400" />
                        <span>{donation.business.name}</span>
                      </div>
                    </div>

                    <div>
                      <h3 className="mb-2 text-sm font-medium text-gray-500">Dirección</h3>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <span>{donation.business.address}</span>
                      </div>
                    </div>

                    <div>
                      <h3 className="mb-2 text-sm font-medium text-gray-500">Contacto</h3>
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-gray-400" />
                        <span>{donation.business.contact}</span>
                      </div>
                    </div>

                    <div>
                      <h3 className="mb-2 text-sm font-medium text-gray-500">Teléfono</h3>
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-gray-400" />
                        <span>{donation.business.phone}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      Ver Perfil
                    </Button>
                  </CardFooter>
                </Card>

                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>Ubicación</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="w-full h-48 overflow-hidden bg-gray-200 rounded-md">
                      <div className="flex items-center justify-center h-full text-gray-500">
                        Mapa no disponible en esta vista previa
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="py-4 text-center text-sm text-gray-500 border-t">
        <div className="container px-4 mx-auto">© 2025 FoodShare. Todos los derechos reservados.</div>
      </footer>
    </div>
  )
}
