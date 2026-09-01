@echo off
setlocal

REM ═══════════════════════════════════════════════════════════
REM  Arranca el ayudante de impresion (print-helper.js) del kiosco.
REM
REM  Todo se resuelve desde %~dp0 (la carpeta donde esta ESTE archivo), no
REM  desde el directorio de trabajo, porque al iniciar sesion Windows lanza
REM  el script con un directorio de trabajo cualquiera.
REM
REM  IMPORTANTE: este .bat tiene que quedarse junto a print-helper.js. En la
REM  carpeta de Inicio va un ACCESO DIRECTO, nunca una copia: una copia
REM  llevaria %~dp0 a la carpeta de Inicio, donde no estan ni el VBS ni el
REM  ayudante, y el arranque fallaria aunque a mano funcione.
REM  Lo que pase queda escrito en inicio-kiosco.log.
REM ═══════════════════════════════════════════════════════════

set "DIR=%~dp0"
set "LOG=%DIR%inicio-kiosco.log"
set "VBS=%DIR%iniciar-impresora.vbs"
set "HELPER=%DIR%print-helper.js"

call :log "--- abrir-kiosco.bat ---"
call :log "Carpeta resuelta: %DIR%"

REM Si el ayudante ya responde, no arrancar una segunda copia. El error de
REM conexion se descarta: que no responda es lo normal aqui, no es un fallo
REM que haya que enseñar por pantalla.
curl.exe -fs "http://127.0.0.1:5217/salud" 2>nul | findstr /I /C:"ok" >nul
if not errorlevel 1 (
  call :log "El ayudante ya estaba escuchando en el puerto 5217. Nada que hacer."
  exit /b 0
)

where node >nul 2>nul
if errorlevel 1 (
  call :log "ERROR: no se encontro Node.js en el PATH. Instalalo y vuelve a ejecutar este archivo."
  echo ERROR: No se encontro Node.js. Revisa "%LOG%".
  exit /b 1
)

REM Al iniciar sesion la carpeta puede tardar en estar disponible: el perfil
REM aun montandose, o OneDrive todavia sin materializar los archivos. Por eso
REM se espera en vez de fallar a la primera; esa es justo la diferencia entre
REM el arranque del ordenador y el doble clic de alguien que llega despues.
REM Se usa ping como espera porque timeout falla si no hay consola (el script
REM puede venir lanzado de forma oculta).
set /a intentos=0
:esperar
if exist "%HELPER%" goto encontrado
set /a intentos+=1
if %intentos% GEQ 30 (
  call :log "ERROR: print-helper.js no aparecio en %DIR% tras 60 segundos."
  call :log "       Si esa carpeta no es la del proyecto, en la carpeta de Inicio hay una COPIA del .bat en vez de un acceso directo."
  exit /b 1
)
ping -n 3 127.0.0.1 >nul
goto esperar

:encontrado
if %intentos% GTR 0 call :log "print-helper.js aparecio tras %intentos% intento(s) de espera."

if exist "%VBS%" (
  REM Via normal: el VBS arranca node sin ninguna ventana de consola.
  call :log "Arrancando el ayudante mediante iniciar-impresora.vbs"
  start "" /b wscript.exe "%VBS%"
) else (
  REM Sin el VBS se arranca igual: quedarse sin impresora es peor que un
  REM parpadeo de ventana, y asi un VBS borrado o bloqueado por el antivirus
  REM no deja el kiosco sin imprimir.
  call :log "AVISO: falta iniciar-impresora.vbs, se arranca por PowerShell."
  powershell -NoProfile -WindowStyle Hidden -Command "Start-Process -FilePath 'node' -ArgumentList 'print-helper.js' -WorkingDirectory '%DIR%' -WindowStyle Hidden"
)

call :log "Lanzado. Comprueba http://localhost:5217/salud o print-helper.log"
exit /b 0

:log
echo [%date% %time%] %~1 >> "%LOG%"
exit /b 0
