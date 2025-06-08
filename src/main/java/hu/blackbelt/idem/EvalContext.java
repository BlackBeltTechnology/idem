package hu.blackbelt.idem;

import lombok.Builder;
import lombok.Getter;

import java.util.Map;

@Builder
@Getter
public class EvalContext {
    Map<String, Object> self;
}
