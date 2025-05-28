"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bell, Home, LogOut, MapPin, Menu, Package, PieChart, Plus, Search, Settings, User } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useMediaQuery } from "@/hooks/use-mobile"

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const userType = "business" // Esto vendría de la autenticación
  const isMobile = useMediaQuery("(max-width: 768px)")

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-white px-4 md:px-6">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Menú</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[240px] sm:w-[280px] p-0">
            <div className="flex h-16 items-center border-b px-6">
              <span className="h-8 w-8 rounded-full bg-green-500 flex items-center justify-center">
                <span className="text-white font-bold">PA</span>
              </span>
              <span className="font-bold ml-2">PrototipoAPP</span>
            </div>
            <nav className="grid gap-2 p-4 text-sm font-medium">
              <Link
                href="/dashboard"
                className="flex items-center gap-2 rounded-lg bg-gray-100 px-3 py-2 text-gray-900"
              >
                <Home className="h-4 w-4" />
                Inicio
              </Link>
              {userType === "business" ? (
                <Link
                  href="/dashboard/donations"
                  className="flex items-center gap-2 rounded-lg px-3 py-2 text-gray-500 hover:text-gray-900"
                >
                  <Package className="h-4 w-4" />
                  Mis Donaciones
                </Link>
              ) : (
                <Link
                  href="/dashboard/available"
                  className="flex items-center gap-2 rounded-lg px-3 py-2 text-gray-500 hover:text-gray-900"
                >
                  <Package className="h-4 w-4" />
                  Donaciones Disponibles
                </Link>
              )}
              <Link
                href="/map"
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-gray-500 hover:text-gray-900"
              >
                <MapPin className="h-4 w-4" />
                Mapa
              </Link>
              <Link
                href="/dashboard/stats"
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-gray-500 hover:text-gray-900"
              >
                <PieChart className="h-4 w-4" />
                Estadísticas
              </Link>
              <Link
                href="/dashboard/profile"
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-gray-500 hover:text-gray-900"
              >
                <Settings className="h-4 w-4" />
                Configuración
              </Link>
              <div className="mt-auto pt-4">
                <Button variant="outline" className="w-full justify-start gap-2">
                  <LogOut className="h-4 w-4" />
                  Cerrar Sesión
                </Button>
              </div>
            </nav>
          </SheetContent>
        </Sheet>

        <div className="flex items-center gap-2 md:hidden">
          <span className="h-8 w-8 rounded-full bg-green-500 flex items-center justify-center">
            <span className="text-white font-bold">PA</span>
          </span>
          <span className="font-bold">PrototipoAPP</span>
        </div>

        <div className="hidden md:flex md:items-center md:gap-2">
          <span className="h-8 w-8 rounded-full bg-green-500 flex items-center justify-center">
            <span className="text-white font-bold">PA</span>
          </span>
          <span className="font-bold">PrototipoAPP</span>
        </div>

        <div className="flex-1"></div>

        <nav className="hidden md:flex md:gap-2">
          <Link href="/dashboard" className="flex items-center gap-2 rounded-lg px-3 py-2 text-gray-900 font-medium">
            <Home className="h-4 w-4" />
            Inicio
          </Link>
          {userType === "business" ? (
            <Link
              href="/dashboard/donations"
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-gray-500 hover:text-gray-900"
            >
              <Package className="h-4 w-4" />
              Mis Donaciones
            </Link>
          ) : (
            <Link
              href="/dashboard/available"
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-gray-500 hover:text-gray-900"
            >
              <Package className="h-4 w-4" />
              Donaciones Disponibles
            </Link>
          )}
          <Link href="/map" className="flex items-center gap-2 rounded-lg px-3 py-2 text-gray-500 hover:text-gray-900">
            <MapPin className="h-4 w-4" />
            Mapa
          </Link>
        </nav>

        <Button variant="outline" size="icon" asChild>
          <Link href="/notifications">
            <Bell className="h-5 w-5" />
            <span className="sr-only">Notificaciones</span>
          </Link>
        </Button>

        <Button variant="outline" size="icon" asChild>
          <Link href="/dashboard/profile">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-green-100 text-green-600">PA</AvatarFallback>
            </Avatar>
            <span className="sr-only">Perfil</span>
          </Link>
        </Button>
      </header>

      <main className="flex-1 p-4 md:p-6">
        <div className="mx-auto max-w-6xl space-y-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
              <p className="text-gray-500">Bienvenido de nuevo, Restaurante Ejemplo</p>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row">
              <div className="relative w-full sm:w-auto">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input type="search" placeholder="Buscar..." className="w-full pl-8 sm:w-[200px] md:w-[260px]" />
              </div>

              {userType === "business" && (
                <Button className="bg-green-600 hover:bg-green-700" asChild>
                  <Link href="/dashboard/new-donation">
                    <Plus className="mr-2 h-4 w-4" />
                    Nueva Donación
                  </Link>
                </Button>
              )}
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Donaciones</CardTitle>
                <Package className="h-4 w-4 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24</div>
                <p className="text-xs text-gray-500">+10% desde el mes pasado</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Donaciones Activas</CardTitle>
                <Package className="h-4 w-4 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">7</div>
                <p className="text-xs text-gray-500">+2 desde la semana pasada</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Kg Donados</CardTitle>
                <Package className="h-4 w-4 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">120</div>
                <p className="text-xs text-gray-500">+15% desde el mes pasado</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Organizaciones Ayudadas</CardTitle>
                <User className="h-4 w-4 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">5</div>
                <p className="text-xs text-gray-500">+1 desde el mes pasado</p>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="overview" onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full grid grid-cols-3 h-auto">
              <TabsTrigger value="overview" className="py-2">
                Resumen
              </TabsTrigger>
              <TabsTrigger value="analytics" className="py-2">
                Analíticas
              </TabsTrigger>
              <TabsTrigger value="reports" className="py-2">
                Reportes
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4 pt-4">
              <div className="grid gap-4 md:grid-cols-7">
                <Card className="col-span-7 md:col-span-4">
                  <CardHeader>
                    <CardTitle>Actividad Reciente</CardTitle>
                    <CardDescription>Historial de donaciones y solicitudes</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className="flex items-center gap-4">
                          <div className="rounded-full bg-gray-100 p-2 flex-shrink-0">
                            <Package className="h-4 w-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium">Donación #{i}</p>
                            <p className="text-xs text-gray-500 truncate">{i % 2 === 0 ? "Entregada" : "En proceso"}</p>
                          </div>
                          <div className="text-xs text-gray-500 flex-shrink-0">
                            Hace {i} {i === 1 ? "día" : "días"}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="col-span-7 md:col-span-3">
                  <CardHeader>
                    <CardTitle>Próximas Entregas</CardTitle>
                    <CardDescription>Donaciones programadas</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="flex items-center gap-4">
                          <div className="rounded-full bg-gray-100 p-2 flex-shrink-0">
                            <Package className="h-4 w-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium">Entrega #{i}</p>
                            <p className="text-xs text-gray-500 truncate">
                              {new Date(Date.now() + i * 86400000).toLocaleDateString()}
                            </p>
                          </div>
                          <Button variant="outline" size="sm" className="flex-shrink-0 whitespace-nowrap">
                            Ver
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-4 pt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Analíticas</CardTitle>
                  <CardDescription>Visualización de métricas y tendencias</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] flex items-center justify-center border rounded">
                    <p className="text-gray-500">Gráficos de analíticas irían aquí</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reports" className="space-y-4 pt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Reportes</CardTitle>
                  <CardDescription>Informes y reportes de actividad</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {["Reporte Mensual", "Reporte de Impacto", "Reporte de Trazabilidad"].map((report) => (
                      <div
                        key={report}
                        className="flex flex-col sm:flex-row sm:items-center justify-between border-b pb-4 gap-2"
                      >
                        <div>
                          <p className="font-medium">{report}</p>
                          <p className="text-sm text-gray-500">Última actualización: hace 2 días</p>
                        </div>
                        <Button variant="outline" className="sm:flex-shrink-0">
                          Descargar PDF
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
