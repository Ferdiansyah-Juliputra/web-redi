<!DOCTYPE html>
<html lang="id">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>REDI - Company Profile</title>

        <!-- Memuat file CSS utama -->
        @vite('resources/css/app.css')
    </head>
    <body class="font-sans antialiased">
        <!-- Ini adalah "kanvas" tempat aplikasi React publik akan dirender -->
        <div id="public-root"></div>
        
        <!-- Ini memuat entry point JAVASCRIPT BARU kita -->
        @viteReactRefresh
        @vite('resources/js/pages/main/app.tsx')
    </body>
</html>