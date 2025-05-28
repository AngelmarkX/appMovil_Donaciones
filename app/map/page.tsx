"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { ArrowLeft, Calendar, Clock, Filter, List, MapPin, Search } from "lucide-react"
import dynamic from "next/dynamic"

// Importamos el mapa dinámicamente para evitar problemas con SSR
const MapComponent = dynamic(() => import("@/components/map-component"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[calc(100vh-4rem)] flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
        <p className="text-gray-500">Cargando mapa...</p>
      </div>
    </div>
  ),
})

export default function MapPage() {
  const [selectedDonation, setSelectedDonation] = useState<any>(null)
  const [showList, setShowList] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [distanceFilter, setDistanceFilter] = useState("all")

  // Datos de ejemplo - en una implementación real vendrían de Firebase
  const donations = [
    {
      id: "1",
      title: "Pan del día",
      category: "bakery",
      quantity: "5",
      unit: "kg",
      expirationDate: "2025-05-20",
      status: "published",
      description: "Pan fresco del día, incluye baguettes y pan de molde.",
      address: "Av. Principal 123, Ciudad",
      pickupTime: "18:00",
      distance: "1.2",
      position: [40.416775, -3.70379], // Madrid
    },
    {
      id: "2",
      title: "Frutas variadas",
      category: "fruits",
      quantity: "10",
      unit: "kg",
      expirationDate: "2025-05-21",
      status: "published",
      description: "Manzanas, plátanos y naranjas en buen estado.",
      address: "Calle Secundaria 45, Ciudad",
      pickupTime: "17:00",
      distance: "2.5",
      position: [40.42, -3.71], // Cerca de Madrid
    },
    {
      id: "3",
      title: "Yogures",
      category: "dairy",
      quantity: "20",
      unit: "units",
      expirationDate: "2025-05-22",
      status: "published",
      description: "Yogures naturales y de sabores.",
      address: "Plaza Central 8, Ciudad",
      pickupTime: "10:00",
      distance: "3.7",
      position: [40.41, -3.69], // Cerca de Madrid
    },
    {
      id: "4",
      title: "Verduras frescas",
      category: "fruits",
      quantity: "8",
      unit: "kg",
      expirationDate: "2025-05-19",
      status: "published",
      description: "Tomates, lechugas, zanahorias y pimientos.",
      address: "Avenida Norte 67, Ciudad",
      pickupTime: "16:00",
      distance: "4.2",
      position: [40.405, -3.695], // Cerca de Madrid
    },
  ]

  const getCategoryLabel = (category: string) => {
    const categories: { [key: string]: string } = {
      bakery: "Panadería",
      dairy: "Lácteos",
      fruits: "Frutas y Verduras",
      meat: "Carnes",
      canned: "Enlatados",
      prepared: "Comida Preparada",
      other: "Otros",
    }
    return categories[category] || category
  }

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      bakery: "#f59e0b", // amber-500
      dairy: "#3b82f6", // blue-500
      fruits: "#10b981", // emerald-500
      meat: "#ef4444", // red-500
      canned: "#8b5cf6", // violet-500
      prepared: "#ec4899", // pink-500
      other: "#6b7280", // gray-500
    }
    return colors[category] || "#6b7280"
  }

  const filteredDonations = donations.filter((donation) => {
    const matchesSearch =
      searchTerm === "" ||
      donation.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      donation.description.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesCategory = categoryFilter === "all" || donation.category === categoryFilter

    const matchesDistance =
      distanceFilter === "all" ||
      (distanceFilter === "5" && Number.parseFloat(donation.distance) <= 5) ||
      (distanceFilter === "10" && Number.parseFloat(donation.distance) <= 10) ||
      (distanceFilter === "20" && Number.parseFloat(donation.distance) <= 20)

    return matchesSearch && matchesCategory && matchesDistance
  })

  return (
    <div className="flex flex-col h-screen">
      <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-white px-4 md:px-6">
        <Link href="/dashboard" className="flex items-center gap-2 text-sm font-medium">
          <ArrowLeft className="h-4 w-4" />
          Volver al Dashboard
        </Link>
        <h1 className="text-lg font-semibold">Mapa de Donaciones</h1>
        <div className="flex-1"></div>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden">
              <Filter className="h-5 w-5" />
              <span className="sr-only">Filtros</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[280px] sm:w-[350px]">
            <SheetHeader>
              <SheetTitle>Filtros</SheetTitle>
            </SheetHeader>
            <div className="py-4 space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Buscar</label>
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                  <Input
                    type="search"
                    placeholder="Buscar donaciones..."
                    className="pl-8 w-full"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Categoría</label>
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Categoría" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas las categorías</SelectItem>
                    <SelectItem value="bakery">Panadería</SelectItem>
                    <SelectItem value="dairy">Lácteos</SelectItem>
                    <SelectItem value="fruits">Frutas y Verduras</SelectItem>
                    <SelectItem value="meat">Carnes</SelectItem>
                    <SelectItem value="canned">Enlatados</SelectItem>
                    <SelectItem value="prepared">Comida Preparada</SelectItem>
                    <SelectItem value="other">Otros</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Distancia</label>
                <Select value={distanceFilter} onValueChange={setDistanceFilter}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Distancia" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Cualquier distancia</SelectItem>
                    <SelectItem value="5">Hasta 5 km</SelectItem>
                    <SelectItem value="10">Hasta 10 km</SelectItem>
                    <SelectItem value="20">Hasta 20 km</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </SheetContent>
        </Sheet>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setShowList(!showList)}
          className="md:hidden"
          aria-label={showList ? "Ver mapa" : "Ver lista"}
        >
          {showList ? <MapPin className="h-5 w-5" /> : <List className="h-5 w-5" />}
        </Button>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Filtros para pantallas medianas y grandes */}
        <div className="hidden md:flex md:w-[300px] lg:w-[350px] flex-col border-r p-4 overflow-y-auto">
          <div className="space-y-4">
            <div className="space-y-2">
              <h2 className="font-medium">Filtros</h2>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  type="search"
                  placeholder="Buscar donaciones..."
                  className="pl-8 w-full"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Categoría</label>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Categoría" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas las categorías</SelectItem>
                  <SelectItem value="bakery">Panadería</SelectItem>
                  <SelectItem value="dairy">Lácteos</SelectItem>
                  <SelectItem value="fruits">Frutas y Verduras</SelectItem>
                  <SelectItem value="meat">Carnes</SelectItem>
                  <SelectItem value="canned">Enlatados</SelectItem>
                  <SelectItem value="prepared">Comida Preparada</SelectItem>
                  <SelectItem value="other">Otros</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Distancia</label>
              <Select value={distanceFilter} onValueChange={setDistanceFilter}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Distancia" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Cualquier distancia</SelectItem>
                  <SelectItem value="5">Hasta 5 km</SelectItem>
                  <SelectItem value="10">Hasta 10 km</SelectItem>
                  <SelectItem value="20">Hasta 20 km</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="mt-6">
            <h2 className="font-medium mb-4">Donaciones disponibles ({filteredDonations.length})</h2>
            <div className="space-y-3">
              {filteredDonations.map((donation) => (
                <Card
                  key={donation.id}
                  className={`cursor-pointer hover:border-green-500 transition-colors ${
                    selectedDonation?.id === donation.id ? "border-green-500 shadow-md" : ""
                  }`}
                  onClick={() => setSelectedDonation(donation)}
                >
                  <CardContent className="p-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{donation.title}</h3>
                        <p className="text-sm text-gray-500">
                          {getCategoryLabel(donation.category)} - {donation.quantity} {donation.unit}
                        </p>
                      </div>
                      <Badge className="bg-green-600">{donation.distance} km</Badge>
                    </div>
                    <div className="mt-2 text-xs text-gray-500 flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      <span>Recogida: {donation.pickupTime}h</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Lista para móviles */}
        {showList ? (
          <div className="flex-1 p-4 overflow-y-auto md:hidden">
            <h2 className="font-medium mb-4">Donaciones disponibles ({filteredDonations.length})</h2>
            <div className="space-y-3">
              {filteredDonations.map((donation) => (
                <Card
                  key={donation.id}
                  className="cursor-pointer hover:border-green-500 transition-colors"
                  onClick={() => {
                    setSelectedDonation(donation)
                    setShowList(false)
                  }}
                >
                  <CardContent className="p-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{donation.title}</h3>
                        <p className="text-sm text-gray-500">
                          {getCategoryLabel(donation.category)} - {donation.quantity} {donation.unit}
                        </p>
                      </div>
                      <Badge className="bg-green-600">{donation.distance} km</Badge>
                    </div>
                    <div className="mt-2 text-xs text-gray-500 flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      <span>Recogida: {donation.pickupTime}h</span>
                    </div>
                    <div className="mt-1 text-xs text-gray-500 flex items-center">
                      <MapPin className="h-3 w-3 mr-1" />
                      <span className="truncate">{donation.address}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex-1 relative">
            <MapComponent
              donations={filteredDonations}
              selectedDonation={selectedDonation}
              setSelectedDonation={setSelectedDonation}
              getCategoryColor={getCategoryColor}
            />

            {/* Popup de información de donación seleccionada en móvil */}
            {selectedDonation && (
              <div className="absolute bottom-4 left-4 right-4 md:hidden">
                <Card className="shadow-lg">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{selectedDonation.title}</h3>
                        <p className="text-sm text-gray-500">
                          {getCategoryLabel(selectedDonation.category)} - {selectedDonation.quantity}{" "}
                          {selectedDonation.unit}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0"
                        onClick={() => setSelectedDonation(null)}
                      >
                        ×
                      </Button>
                    </div>
                    <p className="text-sm mt-2 line-clamp-2">{selectedDonation.description}</p>
                    <div className="mt-2 text-xs text-gray-500 flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      <span>Recogida: {selectedDonation.pickupTime}h</span>
                    </div>
                    <div className="mt-1 text-xs text-gray-500 flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      <span>Caduca: {new Date(selectedDonation.expirationDate).toLocaleDateString()}</span>
                    </div>
                    <div className="mt-1 text-xs text-gray-500 flex items-center">
                      <MapPin className="h-3 w-3 mr-1" />
                      <span className="truncate">{selectedDonation.address}</span>
                    </div>
                    <div className="flex gap-2 mt-3">
                      <Button variant="outline" size="sm" className="flex-1" asChild>
                        <Link href={`/dashboard/available/${selectedDonation.id}`}>Ver Detalles</Link>
                      </Button>
                      <Button size="sm" className="flex-1 bg-green-600 hover:bg-green-700">
                        Solicitar
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
