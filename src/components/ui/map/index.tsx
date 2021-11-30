// modules
import { FC, useState, useEffect } from 'react'
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet'
// style
import styles from './index.module.scss'

interface Props {
  state: any
  setState: any
}

const MapEvents = ({ state, setState }) => {
  const [dragging, setDragging] = useState(false)

  const map = useMapEvents({
    drag: () => {
      const coord = map.getCenter()
      setState((prevState) => ({
        ...prevState,
        lat: coord.lat,
        lng: coord.lng,
      }))
      setDragging(true)
    },
    dragend: () => setDragging(false),
  })

  useEffect(() => {
    if (!dragging) map.panTo({ lat: state.lat, lng: state.lng })
  }, [state, dragging])

  return null
}

const Map: FC<Props> = ({ state, setState }) => (
  <div className={styles.map}>
    <MapContainer
      center={[state.lat, state.lng]}
      zoom={13}
      scrollWheelZoom={false}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={{ lat: state.lat, lng: state.lng }}>Marker</Marker>
      <MapEvents state={state} setState={setState} />
    </MapContainer>
  </div>
)

export default Map
