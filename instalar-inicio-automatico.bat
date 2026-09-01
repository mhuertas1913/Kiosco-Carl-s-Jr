@echo off
setlocal

REM ═══════════════════════════════════════════════════════════
REM  Registra el arranque automatico del ayudante de impresion como TAREA
REM  PROGRAMADA, en vez de con un acceso directo en la carpeta de Inicio.
REM
REM  Por que: el acceso directo de la carpeta de Inicio se rompe con mucha
REM  facilidad (si alguien copia el .bat en vez de crear el acceso directo,
REM  las rutas dejan de apuntar al proyecto y no arranca nada). La tarea
REM  programada guarda la ruta completa, asi que no depende de eso, y
REM  ademas admite un retardo tras iniciar sesion: da tiempo a que el
REM  perfil y OneDrive terminen de montar la carpeta.
REM
REM  Ejecutar UNA vez, con doble clic, desde la carpeta del proyecto.
REM  Para quitarlo:
REM    schtasks /Delete /TN "Kiosco Carls Jr - Ayudante de impresion" /F
REM ═══════════════════════════════════════════════════════════

set "DIR=%~dp0"
set "TAREA=Kiosco Carls Jr - Ayudante de impresion"
set "OBJETIVO=%DIR%abrir-kiosco.bat"

if not exist "%OBJETIVO%" (
  echo ERROR: no se encontro abrir-kiosco.bat junto a este archivo.
  echo Ejecuta este instalador desde la carpeta del proyecto.
  pause
  exit /b 1
)

echo Registrando la tarea para:
echo   %OBJETIVO%
echo.

REM /DELAY 30 s: al iniciar sesion, la carpeta del proyecto puede tardar en
REM estar disponible. abrir-kiosco.bat ya espera por su cuenta, pero empezar
REM mas tarde evita que se ponga a esperar en la mayoria de los arranques.
schtasks /Create /TN "%TAREA%" /TR "\"%OBJETIVO%\"" /SC ONLOGON /RL LIMITED /DELAY 0000:30 /F

if errorlevel 1 (
  echo.
  echo ERROR: no se pudo crear la tarea.
  echo Prueba a ejecutar este archivo con boton derecho, "Ejecutar como administrador".
  pause
  exit /b 1
)

echo.
echo Listo. El ayudante arrancara solo 30 segundos despues de iniciar sesion.
echo Si ya tenias un acceso directo en la carpeta de Inicio (Win+R, shell:startup),
echo borralo para no arrancar dos veces.
echo.
echo Comprobar que funciona, tras reiniciar: http://localhost:5217/salud
pause
exit /b 0
