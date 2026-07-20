import type { BirdVariant, BoatVariant, CentralObject, Palette, VehicleVariant } from '../types';
import { VehicleShape } from './VehicleShape';
import { BirdShape } from './BirdShape';
import { BoatShape } from './BoatShape';

interface Props {
  object: CentralObject;
  palette: Palette;
  width: number;
}

export function CentralObjectShape({ object, palette, width }: Props) {
  const color = palette.accents[object.accentIndex];

  if (object.def.category === 'vehiculo') {
    return (
      <VehicleShape
        variant={object.def.variant as VehicleVariant}
        color={color}
        windowColor={palette.bg}
        width={width}
      />
    );
  }

  if (object.def.category === 'pajaro') {
    return <BirdShape variant={object.def.variant as BirdVariant} color={color} width={width} />;
  }

  return <BoatShape variant={object.def.variant as BoatVariant} color={color} width={width} />;
}
