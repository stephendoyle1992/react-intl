/*
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

import * as React from 'react';
import withIntl from './injectIntl';
import {IntlShape, FormatPluralOptions} from '../types';

interface Props extends FormatPluralOptions {
  value: number;
  intl: IntlShape;
  other: React.ReactNode;
  zero?: React.ReactNode;
  one?: React.ReactNode;
  two?: React.ReactNode;
  few?: React.ReactNode;
  many?: React.ReactNode;
  children?(value: React.ReactNode): React.ReactElement | null;
}

const FormattedPlural: React.FC<Props> = props => {
  const {
    value,
    other,
    children,
    intl: {formatPlural, textComponent: Text},
  } = props;

  let pluralCategory = formatPlural(value, props);
  let formattedPlural = props[pluralCategory as 'one'] || other;

  if (typeof children === 'function') {
    return children(formattedPlural);
  }

  return <Text>{formattedPlural}</Text>;
};

FormattedPlural.defaultProps = {
  type: 'cardinal',
};

FormattedPlural.displayName = 'FormattedPlural';

export default withIntl(FormattedPlural);
