"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Apple, ArrowLeft, Clock, Save } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function ProfilePage() {
  const [userType] = useState("business") // Simulando que es un comercio

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

              <h1 className="text-2xl font-bold">Perfil de Usuario</h1>
              <p className="text-gray-600">Gestiona tu información y preferencias</p>
            </div>

            <Tabs defaultValue="info" className="w-full">
              <TabsList className="grid w-full grid-cols-3 md:w-auto md:inline-flex">
                <TabsTrigger value="info">Información</TabsTrigger>
                <TabsTrigger value="preferences">Preferencias</TabsTrigger>
                <TabsTrigger value="security">Seguridad</TabsTrigger>
              </TabsList>

              <TabsContent value="info" className="pt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Información General</CardTitle>
                    <CardDescription>
                      Actualiza la información básica de tu {userType === "business" ? "comercio" : "organización"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="name">
                          {userType === "business" ? "Nombre del comercio" : "Nombre de la organización"}
                        </Label>
                        <Input
                          id="name"
                          defaultValue={userType === "business" ? "Supermercado XYZ" : "Organización Benéfica ABC"}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Correo electrónico</Label>
                        <Input id="email" type="email" defaultValue="contacto@ejemplo.com" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="address">Dirección</Label>
                      <Input id="address" defaultValue="Calle Principal 123, Ciudad" />
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="phone">Teléfono de contacto</Label>
                        <Input id="phone" type="tel" defaultValue="+34 612 345 678" />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="contact">Persona de contacto</Label>
                        <Input id="contact" defaultValue="Juan Pérez" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Descripción</Label>
                      <Textarea
                        id="description"
                        defaultValue={
                          userType === "business"
                            ? "Supermercado local con productos frescos y de calidad."
                            : "Organización sin fines de lucro dedicada a ayudar a personas en situación de vulnerabilidad."
                        }
                      />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="bg-green-600 hover:bg-green-700">
                      <Save className="w-4 h-4 mr-2" />
                      Guardar Cambios
                    </Button>
                  </CardFooter>
                </Card>

                {userType === "business" && (
                  <Card className="mt-6">
                    <CardHeader>
                      <CardTitle>Horarios de Disponibilidad</CardTitle>
                      <CardDescription>
                        Configura los días y horarios en los que puedes entregar donaciones
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-4">
                        {["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"].map((day) => (
                          <div key={day} className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Switch id={`day-${day}`} defaultChecked={day !== "Domingo"} />
                              <Label htmlFor={`day-${day}`}>{day}</Label>
                            </div>

                            <div className="flex items-center gap-2">
                              <Select defaultValue={day === "Sábado" ? "10:00" : "14:00"}>
                                <SelectTrigger className="w-24">
                                  <SelectValue placeholder="Desde" />
                                </SelectTrigger>
                                <SelectContent>
                                  {Array.from({ length: 13 }, (_, i) => i + 8).map((hour) => (
                                    <SelectItem key={`from-${hour}`} value={`${hour}:00`}>
                                      {`${hour}:00`}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>

                              <span>-</span>

                              <Select defaultValue={day === "Sábado" ? "12:00" : "16:00"}>
                                <SelectTrigger className="w-24">
                                  <SelectValue placeholder="Hasta" />
                                </SelectTrigger>
                                <SelectContent>
                                  {Array.from({ length: 13 }, (_, i) => i + 8).map((hour) => (
                                    <SelectItem key={`to-${hour}`} value={`${hour}:00`}>
                                      {`${hour}:00`}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="bg-green-600 hover:bg-green-700">
                        <Clock className="w-4 h-4 mr-2" />
                        Actualizar Horarios
                      </Button>
                    </CardFooter>
                  </Card>
                )}

                {userType === "organization" && (
                  <Card className="mt-6">
                    <CardHeader>
                      <CardTitle>Necesidades y Preferencias</CardTitle>
                      <CardDescription>
                        Indica qué tipos de alimentos necesitas y tus horarios de recepción
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="needs">Tipos de alimentos que necesitas</Label>
                        <Textarea id="needs" defaultValue="Frutas, verduras, productos no perecederos, lácteos, pan." />
                      </div>

                      <div className="space-y-2">
                        <Label>Horarios de recepción</Label>
                        <div className="space-y-4">
                          {["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"].map((day) => (
                            <div key={day} className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <Switch id={`receive-${day}`} defaultChecked />
                                <Label htmlFor={`receive-${day}`}>{day}</Label>
                              </div>

                              <div className="flex items-center gap-2">
                                <Select defaultValue="09:00">
                                  <SelectTrigger className="w-24">
                                    <SelectValue placeholder="Desde" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {Array.from({ length: 13 }, (_, i) => i + 8).map((hour) => (
                                      <SelectItem key={`from-${hour}`} value={`${hour}:00`}>
                                        {`${hour}:00`}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>

                                <span>-</span>

                                <Select defaultValue="17:00">
                                  <SelectTrigger className="w-24">
                                    <SelectValue placeholder="Hasta" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {Array.from({ length: 13 }, (_, i) => i + 8).map((hour) => (
                                      <SelectItem key={`to-${hour}`} value={`${hour}:00`}>
                                        {`${hour}:00`}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="bg-green-600 hover:bg-green-700">
                        <Save className="w-4 h-4 mr-2" />
                        Guardar Preferencias
                      </Button>
                    </CardFooter>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="preferences" className="pt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Preferencias de Notificaciones</CardTitle>
                    <CardDescription>Configura cómo y cuándo quieres recibir notificaciones</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="email-notifications" className="block">
                            Notificaciones por correo
                          </Label>
                          <p className="text-sm text-gray-500">Recibe actualizaciones en tu correo electrónico</p>
                        </div>
                        <Switch id="email-notifications" defaultChecked />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="push-notifications" className="block">
                            Notificaciones push
                          </Label>
                          <p className="text-sm text-gray-500">Recibe notificaciones en la aplicación</p>
                        </div>
                        <Switch id="push-notifications" defaultChecked />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="new-donations" className="block">
                            Nuevas donaciones
                          </Label>
                          <p className="text-sm text-gray-500">Notificaciones sobre nuevas donaciones disponibles</p>
                        </div>
                        <Switch id="new-donations" defaultChecked />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="status-updates" className="block">
                            Actualizaciones de estado
                          </Label>
                          <p className="text-sm text-gray-500">
                            Notificaciones cuando cambia el estado de una donación
                          </p>
                        </div>
                        <Switch id="status-updates" defaultChecked />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="bg-green-600 hover:bg-green-700">
                      <Save className="w-4 h-4 mr-2" />
                      Guardar Preferencias
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="security" className="pt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Seguridad de la Cuenta</CardTitle>
                    <CardDescription>Actualiza tu contraseña y configura opciones de seguridad</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="current-password">Contraseña actual</Label>
                      <Input id="current-password" type="password" />
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="new-password">Nueva contraseña</Label>
                        <Input id="new-password" type="password" />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="confirm-password">Confirmar contraseña</Label>
                        <Input id="confirm-password" type="password" />
                      </div>
                    </div>

                    <div className="space-y-4 pt-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="two-factor" className="block">
                            Autenticación de dos factores
                          </Label>
                          <p className="text-sm text-gray-500">Añade una capa extra de seguridad a tu cuenta</p>
                        </div>
                        <Switch id="two-factor" />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="bg-green-600 hover:bg-green-700">
                      <Save className="w-4 h-4 mr-2" />
                      Actualizar Seguridad
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>

      <footer className="py-4 text-center text-sm text-gray-500 border-t">
        <div className="container px-4 mx-auto">© 2025 FoodShare. Todos los derechos reservados.</div>
      </footer>
    </div>
  )
}
