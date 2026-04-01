<div {{ $attributes->merge(['class' => '[:where(&)]:bg-white sm:rounded-lg border border-zinc-200 dark:[:where(&)]:bg-white/10 dark:border-white/10']) }}>
    {{ $slot }}
</div>
