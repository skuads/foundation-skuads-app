@props(['src', 'initials', 'alt', 'size' => 'sm'])

@php
    $sizeClasses = [
        'xs' => 'h-6 w-6',
        'sm' => 'h-8 w-8',
        'md' => 'h-12 w-12',
        'lg' => 'h-16 w-16',
    ][$size] ?? 'h-8 w-8';
@endphp

@if ($src)
    <img class="inline-block {{ $sizeClasses }} rounded-full" src="{{ $src }}" alt="{{ $alt ?? '' }}">
@else
    <span class="inline-flex {{ $sizeClasses }} items-center justify-center rounded-full bg-gray-500">
        <span class="text-sm font-medium leading-none text-white">{{ Str::substr($initials ?? '', 0, 2) }}</span>
    </span>
@endif
