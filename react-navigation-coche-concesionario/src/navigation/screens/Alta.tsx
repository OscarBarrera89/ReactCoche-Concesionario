import { StyleSheet, View } from 'react-native';
import { Button, ButtonText } from "@/components/ui/button";
import { FormControl, FormControlError, FormControlErrorText, FormControlErrorIcon, FormControlLabel, FormControlLabelText, FormControlHelper, FormControlHelperText } from "@/components/ui/form-control";
import { Input, InputField } from "@/components/ui/input";
import { VStack } from "@/components/ui/vstack";
import { AlertCircleIcon } from "@/components/ui/icon";
import React, { useEffect, useState } from "react";
import { useNavigation } from '@react-navigation/native';
import { Switch } from "react-native-gesture-handler";
import { Select, SelectTrigger, SelectInput, SelectIcon, SelectPortal, SelectBackdrop, SelectContent, SelectDragIndicator, SelectDragIndicatorWrapper, SelectItem } from "@/components/ui/select"
import { ChevronDownIcon } from "@/components/ui/icon"
	
export default function AltaScreen() {
        interface Concesionario {
          id_concesionario: number;
          nombre: string;
          direccion: string;
          fecha_fundacion: number;
          activo: boolean;
        }
        const [concesionarios, setConcesionarios] = useState<Concesionario[]>([]);
        const [coche, setCoche] = useState({
          id_coche: null,
          id_concesionario: 0,
          matricula: "",
          modelo: "",
          precio: "",
          disponible: false,
          fecha_registro: new Date().toISOString(),
        });
        const [cocheValido, setCocheValido] = useState({
          id_coche: false,
          id_concesionario: false,
          matricula: false,
          modelo: false,
          precio: false,
          disponible: false,
          fecha_registro: false,
        });
        const navigation = useNavigation();

        useEffect(() => {
          async function getConcesionarios() {
            let response = await fetch( "http://localhost:3000/api/concesionario", {method: "GET"});
      
            if (response.ok) {
              let data = await response.json();
              setConcesionarios(data.datos);
            }
          }
      
          getConcesionarios();
        }, []);
      

        const handleSubmit = async () => {
          if (validarDatos()) {
          const cocheConFecha = {
            ...coche,
            fecha_registro: formatoFecha(new Date()),
          };
        
          console.log("Enviando JSON:", JSON.stringify(cocheConFecha, null, 2));
        
          try {
            const response = await fetch("http://localhost:3000/api/coche", {
              method: "POST",
              headers: { "Content-Type": "application/json" }, 
              body: JSON.stringify(cocheConFecha),
            });
        
            if (response.ok) {
              const respuesta = await response.json();
              alert(respuesta.mensaje);
              if (respuesta.ok) {
                navigation.goBack();
              }
            } else {
              const errorText = await response.text();
              console.error("Error en la respuesta:", errorText);
              alert("Error al registrar el coche");
            }
          } catch (error) {
            console.error("Error:", error);
            alert("Error al conectar con el servidor");
          }
        }};
        const formatoFecha = (fecha : any) => {
          console.log(fecha);
          const ano = fecha.getFullYear();
          const mes = String(fecha.getMonth() + 1).padStart(2, "0"); 
          const dia = String(fecha.getDate()).padStart(2, "0"); 
          return `${ano}-${mes}-${dia}`;
        };

        function validarDatos() {
          const matriculaValida = /^[0-9]{4}[A-Z]{3}$/.test(coche.matricula.trim());
          const modeloValido = coche.modelo.trim() !== "";
          const precioValido =
            !isNaN(Number(coche.precio)) && coche.precio.trim() !== "";
      
          setCocheValido({
            ...cocheValido,
            matricula: !matriculaValida,
            modelo: !modeloValido,
            precio: !precioValido,
          });
          return matriculaValida && modeloValido && precioValido;
        }
return (
      <View style={styles.container}>
      <VStack className="w-full max-w-[300px] rounded-md border border-background-200 p-4">
            <FormControl isInvalid={cocheValido.id_concesionario} size="md">
              <FormControlLabel>
                <FormControlLabelText>Concesionario que almacena el coche</FormControlLabelText>
              </FormControlLabel>
              <Select onValueChange={(value) => setCoche({ ...coche, id_concesionario: parseInt(value) })}>
                <SelectTrigger variant="outline" size="md">
                  <SelectInput 
                    placeholder="Selecciona Concesionario" 
                    value={concesionarios.find(c => c.id_concesionario === coche.id_concesionario)?.nombre ?? ""}
                  />
                  <SelectIcon className="mr-3" as={ChevronDownIcon} />
                </SelectTrigger>
                <SelectPortal>
                  <SelectBackdrop />
                  <SelectContent>
                    <SelectDragIndicatorWrapper>
                      <SelectDragIndicator />
                    </SelectDragIndicatorWrapper>
                    {concesionarios.map((concesionario) => (
                      <SelectItem
                        key={concesionario.id_concesionario}
                        label={concesionario.nombre}
                        value={concesionario.id_concesionario.toString()}
                      />
                    ))}
                  </SelectContent>
                </SelectPortal>
              </Select>
            </FormControl>
            <FormControl isInvalid={cocheValido.matricula} size="md" isDisabled={false} isReadOnly={false} isRequired={false} >
              <FormControlLabel>
                <FormControlLabelText>Matricula del coche</FormControlLabelText>
              </FormControlLabel>
              <Input className="my-1" size="sm">
                <InputField
                  type="text"
                  placeholder="Matricula(Ej: 1234ABC)"
                  value={coche.matricula}
                  onChangeText={(text) => setCoche({...coche, matricula: text})}
                />
              </Input>
              <FormControlError>
                <FormControlErrorIcon as={AlertCircleIcon} />
                <FormControlErrorText>
                  La matricula es Obligatoria
                </FormControlErrorText>
              </FormControlError>
            </FormControl>
            <FormControl isInvalid={cocheValido.modelo} size="md" isDisabled={false} isReadOnly={false} isRequired={false} >
              <FormControlLabel>
                <FormControlLabelText>Modelo del coche</FormControlLabelText>
              </FormControlLabel>
              <Input className="my-1" size="sm">
                <InputField
                  type="text"
                  placeholder="Modelo(Ej: Seat Cordoba)"
                  value={coche.modelo}
                  onChangeText={(text) => setCoche({...coche, modelo: text})}
                />
              </Input>
              <FormControlError>
                <FormControlErrorIcon as={AlertCircleIcon} />
                <FormControlErrorText>
                  El modelo es Obligatorio
                </FormControlErrorText>
              </FormControlError>
            </FormControl>
            <FormControl isInvalid={cocheValido.precio} size="md" isDisabled={false} isReadOnly={false} isRequired={false} >
              <FormControlLabel>
                <FormControlLabelText>Precio del coche</FormControlLabelText>
              </FormControlLabel>
              <Input className="my-1" size="sm">
                <InputField
                  type="text"
                  placeholder="Precio(Ej: 2000.67)"
                  value={coche.precio}
                  onChangeText={(text) => setCoche({...coche, precio: text})}
                />
              </Input>
              <FormControlError>
                <FormControlErrorIcon as={AlertCircleIcon} />
                <FormControlErrorText>
                  El precio es obligatorio
                </FormControlErrorText>
              </FormControlError>
            </FormControl>
            <FormControl isInvalid={cocheValido.disponible} size="md" isDisabled={false} isReadOnly={false} isRequired={false} >
              <FormControlLabel>
                <FormControlLabelText>Disponibilidad del coche</FormControlLabelText>
              </FormControlLabel>
              <Switch
                  value={coche.disponible}
                  onValueChange={(value) => setCoche({ ...coche, disponible: value })}
              />
              <FormControlError>
                <FormControlErrorIcon as={AlertCircleIcon} />
                <FormControlErrorText>
                  La matricula es Obligatoria
                </FormControlErrorText>
              </FormControlError>
            </FormControl>
            <Button className="w-fit self-end mt-4" size="sm" onPress={handleSubmit}>
              <ButtonText>Submit</ButtonText>
            </Button>
          </VStack>
          </View>
        );
      };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
});