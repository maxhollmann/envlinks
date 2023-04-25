{
  config(title, links):: (
    local is = std.range(0, std.length(links) - 1);
    local fmtI(i) = '%03d' % i;

    {
      LINKS_TITLE: title,
    }
    + {
      ['LINK_' + fmtI(i) + '_URL']: links[i].url
      for i in is
    }
    + {
      ['LINK_' + fmtI(i) + '_NAME']: links[i].name
      for i in is
    }
    + {
      ['LINK_' + fmtI(i) + '_INDEX']: std.toString(i)
      for i in is
    }
    + {
      ['LINK_' + fmtI(i) + '_ICON']: links[i].icon
      for i in is
      if links[i].icon != null
    }
  ),

  link(name, url, icon=null):: {
    name: name,
    url: url,
    icon: icon,
  },
}
