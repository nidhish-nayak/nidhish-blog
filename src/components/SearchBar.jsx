const SearchBar = ({ props }) => {

  return (
    <a href={props.url} class="bg-zinc-200 dark:bg-zinc-900 p-4 rounded-md group">
      <div class="relative">
        <span class="arrow absolute top-0 right-0 text-lg group-hover:text-orange-500 dark:group-hover:text-purple-500">&#129125;</span>
        <article class="flex flex-col gap-2">
          <h1 class="font-bold text-xl group-hover:text-orange-500 dark:group-hover:text-purple-500">{props.frontmatter.title}</h1>
          <p class="max-w-[300px]">{props.frontmatter.description}</p>
          <p class="flex flex-wrap gap-2">
            {props.frontmatter.tags.map(tag =>
              <span class="bg-zinc-100 dark:bg-zinc-800 py-1 px-2 rounded-md">{tag}</span>)
            }
          </p>
        </article>
      </div>
    </a>
  )
}

export default SearchBar;

