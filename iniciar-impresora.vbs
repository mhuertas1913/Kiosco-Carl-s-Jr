' Arranca el ayudante de impresion (print-helper.js) totalmente oculto,
' sin ninguna ventana de consola. Doble clic para probarlo a mano, o se
' lanza solo desde abrir-kiosco.bat.
'
' Se resuelve todo desde la carpeta de ESTE archivo, no desde el directorio
' de trabajo: al iniciar sesion Windows lo lanza con uno cualquiera.
Option Explicit

Dim fso, shell, carpeta, ayudante, registro

Set fso = CreateObject("Scripting.FileSystemObject")
Set shell = CreateObject("WScript.Shell")

carpeta = fso.GetParentFolderName(WScript.ScriptFullName)
ayudante = fso.BuildPath(carpeta, "print-helper.js")
registro = fso.BuildPath(carpeta, "inicio-kiosco.log")

' Si el ayudante no esta al lado, este script se ha movido o copiado solo.
' Se deja escrito en el log en vez de morir en silencio (o peor, con un
' popup de Windows Script Host delante del cliente en un totem).
If Not fso.FileExists(ayudante) Then
  Apuntar registro, "ERROR: no se encontro print-helper.js junto a " & WScript.ScriptFullName
  Apuntar registro, "       iniciar-impresora.vbs tiene que quedarse en la carpeta del proyecto."
  WScript.Quit 1
End If

shell.CurrentDirectory = carpeta
shell.Run "cmd /c node ""print-helper.js"" >> ""print-helper.log"" 2>&1", 0, False

Sub Apuntar(archivo, texto)
  Dim salida
  On Error Resume Next
  Set salida = fso.OpenTextFile(archivo, 8, True)   ' 8 = anadir al final
  If Err.Number = 0 Then
    salida.WriteLine "[" & Now & "] " & texto
    salida.Close
  End If
  On Error Goto 0
End Sub
