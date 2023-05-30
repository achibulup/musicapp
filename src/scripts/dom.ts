function makeDomElement<Elem extends HTMLElement = HTMLElement>(htmlString: string) : Elem {
  const template = document.createElement('template');
  template.innerHTML = htmlString.trim();
  return template.content.firstChild as Elem;
}