// Minimal Kakao Maps type declarations used in this project
// Not exhaustive — extend as needed.

declare namespace kakao {
  namespace maps {
    // SDK loader: available when script is loaded with `autoload=false`
    function load(callback: () => void): void

    class LatLng {
      constructor(lat: number, lng: number)
    }

    type MapOptions = {
      center: LatLng
      level?: number
    }

    class Map {
      constructor(container: HTMLElement, options: MapOptions)
      setCenter(latlng: LatLng): void
      setLevel(level: number): void
    }

    type CustomOverlayOptions = {
      position: LatLng
      map?: Map
      content?: HTMLElement | string
      xAnchor?: number
      yAnchor?: number
    }

    class CustomOverlay {
      constructor(options: CustomOverlayOptions)
      setMap(map: Map | null): void
      setPosition(pos: LatLng): void
    }

    type CircleOptions = {
      map?: Map
      center: LatLng
      radius: number
      strokeWeight?: number
      fillColor?: string
      fillOpacity?: number
    }

    class Circle {
      constructor(options: CircleOptions)
      setMap(map: Map | null): void
      setPosition(pos: LatLng): void
      setRadius(radius: number): void
    }

    type MarkerOptions = {
      position: LatLng
      map?: Map
    }

    class Marker {
      constructor(options: MarkerOptions)
      setMap(map: Map | null): void
    }
  }
}

declare global {
  interface Window {
    kakao: typeof kakao
  }
}
