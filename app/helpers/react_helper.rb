module ReactHelper
  def react_component(name, props: {}, html_class: nil)
    content_tag(
      'div',
      nil,
      class: html_class,
      data: { controller: 'react', 'react-component' => name, 'react-props' => react_props(props) }
    )
  end

  def react_props(**args)
    return nil if args.nil?
    JSON.dump(args)
  end
end

