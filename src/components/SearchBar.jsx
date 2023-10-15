const SearchBar = ({ props }) => {
  return (
    <a href={props.url} class="bg-zinc-200 dark:bg-zinc-900 p-6 rounded-md group">
      <div class="relative">
        <span class="arrow absolute top-0 right-0 text-lg group-hover:text-orange-500 dark:group-hover:text-purple-500">&#129125;</span>
        <article class="flex flex-col gap-2 justify-between">
          <h1 class="font-bold text-2xl hover:underline group-hover:decoration-orange-500 dark:group-hover:decoration-purple-500">
            {props.frontmatter.title}
          </h1>
          <p class="text-zinc-500 text-[0.92rem]">{
            new Date(props.frontmatter.pubDate).toDateString().slice(4, 10) +
            ", " +
            new Date(props.frontmatter.pubDate).toDateString().slice(10, 15)
          }</p>
          <p class="flex flex-wrap gap-2 italic">
            {props.frontmatter.tags.map(tag =>
              <span class="bg-zinc-100 border border-zinc-500 dark:bg-zinc-800 py-1 px-2 rounded-md">{tag}</span>)
            }
          </p>
          <p class="mt-2">{props.frontmatter.description}</p>
          <p class="text-orange-600 dark:text-purple-600">Read More</p>
        </article>
      </div>
    </a>
  )
}

export default SearchBar;

