"use client"

import { useEffect, useState } from "react"
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet"
import L from "leaflet"
import "leaflet/dist/leaflet.css"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Calendar, Clock, MapPin } from "lucide-react"

// Componente para actualizar la vista del mapa cuando cambia la donación seleccionada
function ChangeView({ center, zoom }: { center: [number, number]; zoom: number }) {
  const map = useMap()
  map.setView(center, zoom)
  return null
}

export default function MapComponent({
  donations,
  selectedDonation,
  setSelectedDonation,
  getCategoryColor,
}: {
  donations: any[]
  selectedDonation: any
  setSelectedDonation: (donation: any) => void
  getCategoryColor: (category: string) => string
}) {
  const [map, setMap] = useState<L.Map | null>(null)

  // Corregir el problema de los iconos de Leaflet en Next.js
  useEffect(() => {
    // Solo ejecutar en el cliente
    delete L.Icon.Default.prototype._getIconUrl
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
      iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
      shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
    })
  }, [])

  // Crear iconos personalizados para los marcadores
  const createCustomIcon = (category: string, selected: boolean) => {
    return new L.Icon({
      iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
      iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
      shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
      iconSize: selected ? [30, 45] : [25, 41],
      iconAnchor: selected ? [15, 45] : [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
      className: `custom-icon-${category}`,
    })
  }

  // Aplicar estilos CSS para los marcadores personalizados
  const style = document.createElement("style")
  style.innerHTML = donations
    .map(
      (donation) => `
      .custom-icon-${donation.category} {
        filter: hue-rotate(${getHueRotation(getCategoryColor(donation.category))}deg);
      }
    `,
    )
    .join("\n")
  document.head.appendChild(style)

  // Función para calcular la rotación de tono basada en el color
  function getHueRotation(hexColor: string) {
    // Convertir hex a RGB
    const r = Number.parseInt(hexColor.slice(1, 3), 16) / 255
    const g = Number.parseInt(hexColor.slice(3, 5), 16) / 255
    const b = Number.parseInt(hexColor.slice(5, 7), 16) / 255

    // Calcular HSL
    const max = Math.max(r, g, b)
    const min = Math.min(r, g, b)
    let h = 0

    if (max === min) {
      h = 0 // achromatic
    } else {
      const d = max - min
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0)
          break
        case g:
          h = (b - r) / d + 2
          break
        case b:
          h = (r - g) / d + 4
          break
      }
      h /= 6
    }

    // Convertir a grados y ajustar para el filtro hue-rotate
    // El marcador por defecto es azul (240 grados)
    const targetHue = h * 360
    return targetHue - 240
  }

  // Calcular el centro del mapa
  const center = selectedDonation
    ? (selectedDonation.position as [number, number])
    : donations.length > 0
      ? (donations[0].position as [number, number])
      : [40.416775, -3.70379] // Madrid por defecto

  useEffect(() => {
    return () => {
      document.head.removeChild(style)
    }
  }, [])

  return (
    <MapContainer center={center} zoom={13} style={{ height: "100%", width: "100%" }} whenCreated={setMap}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {selectedDonation && <ChangeView center={selectedDonation.position} zoom={15} />}
      {donations.map((donation) => (
        <Marker
          key={donation.id}
          position={donation.position}
          icon={createCustomIcon(donation.category, selectedDonation?.id === donation.id)}
          eventHandlers={{
            click: () => {
              setSelectedDonation(donation)
            },
          }}
        >
          <Popup className="donation-popup">
            <div className="p-1">
              <h3 className="font-medium text-base">{donation.title}</h3>
              <p className="text-sm">{donation.description}</p>
              <div className="mt-2 text-xs text-gray-500 flex items-center">
                <Clock className="h-3 w-3 mr-1" />
                <span>Recogida: {donation.pickupTime}h</span>
              </div>
              <div className="mt-1 text-xs text-gray-500 flex items-center">
                <Calendar className="h-3 w-3 mr-1" />
                <span>Caduca: {new Date(donation.expirationDate).toLocaleDateString()}</span>
              </div>
              <div className="mt-1 text-xs text-gray-500 flex items-center">
                <MapPin className="h-3 w-3 mr-1" />
                <span>{donation.address}</span>
              </div>
              <div className="flex gap-2 mt-3">
                <Button variant="outline" size="sm" className="text-xs py-1 h-7" asChild>
                  <Link href={`/dashboard/available/${donation.id}`}>Ver Detalles</Link>
                </Button>
                <Button size="sm" className="text-xs py-1 h-7 bg-green-600 hover:bg-green-700">
                  Solicitar
                </Button>
              </div>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}
