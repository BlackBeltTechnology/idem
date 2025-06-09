package hu.blackbelt.idem;

import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Singular;
import lombok.ToString;

import java.util.List;

@Builder
@Getter
@ToString
@EqualsAndHashCode
public class AstNode {

    AstNodeType type;
    Object value;
    String operator;

    @Singular
    List<AstNode> children;

    // For identifiers, function names, enum types etc.
    String name;

    // For iterator arguments (e.g., "p" in "p | p.name")
    String iteratorVar;
    AstNode iteratorExpression;
    String direction; // For sort arguments (ASC/DESC)


    // For function calls
    AstNode target;
    @Singular
    List<AstNode> arguments;
}
