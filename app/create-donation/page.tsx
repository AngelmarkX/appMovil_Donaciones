"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Apple, ArrowLeft, Calendar, Clock, Save } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"

export default function CreateDonationPage() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    quantity: "",
    expiryDate: "",
    pickupTimes: [] as string[],
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aquí iría la lógica para crear la donación
    console.log("Donation data:", formData)
  }

  // Horarios de disponibilidad configurados en el perfil
  const availableTimes = [
    "Lunes: 14:00 - 16:00",
    "Martes: 14:00 - 16:00",
    "Miércoles: 14:00 - 16:00",
    "Jueves: 14:00 - 16:00",
    "Viernes: 14:00 - 16:00",
    "Sábado: 10:00 - 12:00",
  ]

  const handleTimeToggle = (time: string) => {
    setFormData((prev) => {
      const times = [...prev.pickupTimes]
      if (times.includes(time)) {
        return { ...prev, pickupTimes: times.filter((t) => t !== time) }
      } else {
        return { ...prev, pickupTimes: [...times, time] }
      }
    })
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

              <h1 className="text-2xl font-bold">Crear Nueva Donación</h1>
              <p className="text-gray-600">Publica un nuevo excedente de alimentos para donación</p>
            </div>

            <Card>
              <form onSubmit={handleSubmit}>
                <CardHeader>
                  <CardTitle>Información de la Donación</CardTitle>
                  <CardDescription>Proporciona los detalles sobre los alimentos que deseas donar</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="title">Título de la donación</Label>
                    <Input
                      id="title"
                      name="title"
                      placeholder="Ej: Frutas y verduras frescas"
                      value={formData.title}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Descripción detallada</Label>
                    <Textarea
                      id="description"
                      name="description"
                      placeholder="Describe los alimentos, su estado, etc."
                      value={formData.description}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="category">Categoría</Label>
                      <Select
                        onValueChange={(value) => handleSelectChange("category", value)}
                        value={formData.category}
                      >
                        <SelectTrigger id="category">
                          <SelectValue placeholder="Selecciona una categoría" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="fruits-vegetables">Frutas y verduras</SelectItem>
                          <SelectItem value="bakery">Panadería y bollería</SelectItem>
                          <SelectItem value="dairy">Lácteos</SelectItem>
                          <SelectItem value="meat">Carnes</SelectItem>
                          <SelectItem value="prepared">Comida preparada</SelectItem>
                          <SelectItem value="canned">Conservas</SelectItem>
                          <SelectItem value="other">Otros</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="quantity">Cantidad aproximada</Label>
                      <Input
                        id="quantity"
                        name="quantity"
                        placeholder="Ej: 5kg, 10 unidades"
                        value={formData.quantity}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="expiryDate">Fecha de caducidad</Label>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <Input
                        id="expiryDate"
                        name="expiryDate"
                        type="date"
                        value={formData.expiryDate}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Horarios de recogida disponibles</Label>
                    <p className="text-sm text-gray-500">
                      Selecciona los horarios en los que la donación estará disponible para recogida
                    </p>

                    <div className="grid gap-2 pt-2">
                      {availableTimes.map((time) => (
                        <div key={time} className="flex items-center gap-2">
                          <Checkbox
                            id={`time-${time}`}
                            checked={formData.pickupTimes.includes(time)}
                            onCheckedChange={() => handleTimeToggle(time)}
                          />
                          <Label htmlFor={`time-${time}`} className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-gray-400" />
                            {time}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button type="button" variant="outline">
                    Cancelar
                  </Button>
                  <Button type="submit" className="bg-green-600 hover:bg-green-700">
                    <Save className="w-4 h-4 mr-2" />
                    Publicar Donación
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </div>
        </div>
      </main>

      <footer className="py-4 text-center text-sm text-gray-500 border-t">
        <div className="container px-4 mx-auto">© 2025 FoodShare. Todos los derechos reservados.</div>
      </footer>
    </div>
  )
}
