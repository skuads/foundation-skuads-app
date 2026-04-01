@props(['score' => 1, 'total' => 5])

<div {{ $attributes->merge(['class' => 'relative inline-flex']) }}>
    @foreach (range(1, $total) as $star)
    <x-heroicon-s-star class="w-5 h-5 {{ ($star <= $score) ? 'text-yellow-400' : 'text-gray-500' }}" />
    @endforeach
</div>
